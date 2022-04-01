import json
import os
from datetime import datetime
from time import sleep
from typing import Any, Dict, List

import requests
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from requests.exceptions import ChunkedEncodingError
from urllib3.exceptions import ProtocolError

from helpers.instances import redis as redis_instance

from .constants import MOST_RECENT_TWEET_TIMESTAMP_KEY
from .exceptions import ManyConsecutiveBlanksError, TooManyConnectionsError
from .twitter_accounts import ACCOUNT_TO_GROUPS_MAPPING, ALL_ACCOUNTS

TWITTER_BEARER_TOKEN = os.getenv("TWITTER_BEARER_TOKEN")

STREAM_RULE_MAX_LENGTH = 512
STREAM_RULE_CONNECTOR_LENGTH = len(" OR from:")

CHANNEL_LAYER = get_channel_layer()
RECONNECT_BACKOFF_TIME = 5


def build_rules(accounts: List[str]) -> List[Dict[str, str]]:
    rules: List[Dict[str, str]] = []
    current_rule: str = ""
    print(f"Building rules for {len(accounts)} accounts")
    for account in accounts:
        if (STREAM_RULE_MAX_LENGTH - len(current_rule)) < (
            STREAM_RULE_CONNECTOR_LENGTH + len(account)
        ):
            rules.append({"value": current_rule})
            current_rule = ""

        current_rule += f"{' OR ' if current_rule else ''}from:{account.lower()}"
    rules.append({"value": current_rule})

    return rules


def get_rules():
    resp = requests.get(
        "https://api.twitter.com/2/tweets/search/stream/rules",
        headers={
            "Authorization": f"Bearer {TWITTER_BEARER_TOKEN}",
        },
    )

    return resp.json()


def add_rules(rules):
    print(f"Adding {len(rules)} rules")
    resp = requests.post(
        "https://api.twitter.com/2/tweets/search/stream/rules",
        json={"add": rules},
        headers={
            "Authorization": f"Bearer {TWITTER_BEARER_TOKEN}",
        },
    )

    return resp.json()


def delete_rules(rules):
    print(f"Deleting {rules['meta']['result_count']} rules")
    if rules["meta"]["result_count"] == 0:
        return

    ids = [rule["id"] for rule in rules["data"]]
    resp = requests.post(
        "https://api.twitter.com/2/tweets/search/stream/rules",
        json={"delete": {"ids": ids}},
        headers={
            "Authorization": f"Bearer {TWITTER_BEARER_TOKEN}",
        },
    )

    return resp.json()


def get_stream():
    global RECONNECT_BACKOFF_TIME
    blank_count = 0
    print("\nget_stream")
    resp = requests.get(
        "https://api.twitter.com/2/tweets/search/stream?user.fields=username&expansions=author_id",
        stream=True,
        headers={
            "Authorization": f"Bearer {TWITTER_BEARER_TOKEN}",
        },
    )

    for line in resp.iter_lines():
        if line:
            tweet = json.loads(line)
            if "connection_issue" in tweet:
                print(tweet)
                resp.close()
                raise TooManyConnectionsError
            process_tweet(tweet)
            RECONNECT_BACKOFF_TIME = 5
            blank_count = 0
        else:
            RECONNECT_BACKOFF_TIME = 5
            blank_count += 1
            print(line)
            if blank_count > 10:
                resp.close()
                sleep(RECONNECT_BACKOFF_TIME)
                raise ManyConsecutiveBlanksError


def process_tweet(tweet: Dict[str, Any]):
    tweet_id = tweet.get("data", {}).get("id")
    if not tweet_id:
        print(tweet)
        return

    author_id = tweet.get("data", {}).get("author_id", "")
    users = tweet.get("includes", {}).get("users", [])
    author = list(filter(lambda user: user.get("id") == author_id, users))
    if author:
        author = author[0]
        groups = ACCOUNT_TO_GROUPS_MAPPING.get(author.get("username", "").lower())
        if groups:
            for group in groups:
                print(
                    datetime.now().isoformat(),
                    author.get("username", ""),
                    group,
                    tweet_id,
                )
                async_to_sync(CHANNEL_LAYER.group_send)(
                    group, {"type": "event_message", "message": tweet_id}
                )
                redis_instance.set(
                    MOST_RECENT_TWEET_TIMESTAMP_KEY,
                    datetime.now().strftime("%Y %b %d, %A, %H:%M:%S"),
                )


def run_stream():
    global RECONNECT_BACKOFF_TIME
    added_rules = get_rules()
    delete_rules(added_rules)
    rules = build_rules(ALL_ACCOUNTS)
    add_rules(rules)
    while True:
        try:
            get_stream()
        except (
            ValueError,
            ChunkedEncodingError,
            ProtocolError,
            TooManyConnectionsError,
            ManyConsecutiveBlanksError,
        ) as e:
            print(f"Sleep - {RECONNECT_BACKOFF_TIME}; Restarted because of {type(e)}")
            sleep(RECONNECT_BACKOFF_TIME)
            RECONNECT_BACKOFF_TIME += 5
            continue
