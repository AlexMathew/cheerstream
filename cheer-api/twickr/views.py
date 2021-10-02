from django.http.request import HttpRequest
from django.http.response import JsonResponse
from django.views import View


class WebsocketView(View):
    def get(
        self, request: HttpRequest, event_name: str, match_name: str, *args, **kwargs
    ):
        return JsonResponse(
            {"websocket": f"ws://{request.get_host()}/ws/{event_name}/{match_name}/"}
        )
