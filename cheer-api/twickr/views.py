from django.conf import settings
from django.http.request import HttpRequest
from django.http.response import JsonResponse
from django.views import View


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
