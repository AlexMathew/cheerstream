import requests
from django.conf import settings
from django.http.request import HttpRequest
from django.http.response import JsonResponse
from django.views import View
from requests.models import Response


class WebsocketView(View):
    def get(
        self, request: HttpRequest, sport: str, event: str, match: str, *args, **kwargs
    ):
        protocol = "wss" if request.is_secure() else "ws"
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
