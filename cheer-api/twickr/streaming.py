import json
import os
from typing import Dict, List

import requests

from .twitter_accounts import ALL_ACCOUNTS

TWITTER_BEARER_TOKEN = os.getenv("TWITTER_BEARER_TOKEN")

STREAM_RULE_MAX_LENGTH = 512
STREAM_RULE_CONNECTOR_LENGTH = len(" OR from:")


def build_rules(accounts: List[str]) -> List[Dict[str, str]]:
    rules: List[Dict[str, str]] = []
    current_rule: str = ""
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
    resp = requests.post(
        "https://api.twitter.com/2/tweets/search/stream/rules",
        json={"add": rules},
        headers={
            "Authorization": f"Bearer {TWITTER_BEARER_TOKEN}",
        },
    )

    return resp.json()


def delete_rules(rules):
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
            print(json.dumps(tweet, indent=4, sort_keys=True))


def run_stream():
    added_rules = get_rules()
    delete_rules(added_rules)
    rules = build_rules(ALL_ACCOUNTS)
    add_rules(rules)
    get_stream()
