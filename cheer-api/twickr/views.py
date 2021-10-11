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
                "websocket": f"{protocol}://{request.get_host()}/ws/{sport}/{event}/{match}/"
            }
        )
