import json
import os
from typing import Any, Dict, List

import requests
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from .twitter_accounts import ACCOUNT_TO_GROUP_MAPPING, ALL_ACCOUNTS

TWITTER_BEARER_TOKEN = os.getenv("TWITTER_BEARER_TOKEN")

STREAM_RULE_MAX_LENGTH = 512
STREAM_RULE_CONNECTOR_LENGTH = len(" OR from:")

CHANNEL_LAYER = get_channel_layer()


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
            process_tweet(tweet)


def process_tweet(tweet: Dict[str, Any]):
    tweet_id = tweet.get("data", {}).get("id")
    if not tweet_id:
        return

    author_id = tweet.get("data", {}).get("author_id", "")
    users = tweet.get("includes", {}).get("users", [])
    author = list(filter(lambda user: user.get("id") == author_id, users))
    if author:
        author = author[0]
        group = ACCOUNT_TO_GROUP_MAPPING.get(author.get("username", ""))
        if group:
            print(group, tweet_id)
            async_to_sync(CHANNEL_LAYER.group_send)(
                group, {"type": "event_message", "message": tweet_id}
            )


def run_stream():
    added_rules = get_rules()
    delete_rules(added_rules)
    rules = build_rules(ALL_ACCOUNTS)
    add_rules(rules)
    get_stream()
