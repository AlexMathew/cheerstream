import requests
from django.conf import settings
from django.http.request import HttpRequest
from django.http.response import JsonResponse
from django.views import View
from requests.models import Response

from helpers.instances import redis as redis_instance

from .constants import MOST_RECENT_TWEET_TIMESTAMP_KEY


class WebsocketView(View):
    def get(
        self, request: HttpRequest, sport: str, event: str, match: str, *args, **kwargs
    ):
        # protocol = "wss" if request.is_secure() else "ws"
        protocol = "wss"
        return JsonResponse(
            {
                "websocket": f"{protocol}://{settings.WS_API_URL}/ws/{sport}/{event}/{match}/"
            }
        )


class TwitterEmbedView(View):
    def get(self, request: HttpRequest, *args, **kwargs):
        url = request.GET.get("url")
        if url:
            response: Response = requests.get(
                f"https://publish.twitter.com/oembed?url={url}"
            )
            data = response.json()
            return JsonResponse(
                {
                    "embed": data.get("html", "").strip("\n"),
                }
            )

        return JsonResponse({"embed": ""})


class MostRecentTweetView(View):
    def get(self, request: HttpRequest, *args, **kwargs):
        return JsonResponse(
            {
                "time": (
                    redis_instance.get(MOST_RECENT_TWEET_TIMESTAMP_KEY) or b""
                ).decode(),
            }
        )


class PromptHeroGumroadPingView(View):
    def post(self, request: HttpRequest, *args, **kwargs):
        import json
        import os

        from supabase import Client, create_client

        url = os.getenv("SUPABASE_API_URL") or ""
        key = os.getenv("SUPABASE_API_KEY") or ""
        supabase: Client = create_client(url, key)
        table_name = "paid_users"

        request_data = json.loads(request.body)
        buyer_email = request_data.get("email", "")
        if not buyer_email:
            return JsonResponse({"success": False})

        select_data = (
            supabase.table(table_name).select("id").eq("email", buyer_email).execute()
        )
        if len(select_data.data) == 0:
            supabase.table(table_name).insert(
                {"email": buyer_email, "paying": True}
            ).execute()
        else:
            user_id = select_data.data[0]["id"]
            supabase.table(table_name).update({"paying": True}).match(
                {"id": user_id}
            ).execute()

        return JsonResponse({"success": True})
