from django.http.request import HttpRequest
from django.http.response import JsonResponse
from django.views import View
from helpers.instances import redis

from .constants import TRACKR_PREFIX


class RealtimeStatsView(View):
    def get(self, request: HttpRequest, *args, **kwargs):
        return JsonResponse(
            {
                "realtime": f"ws://{request.get_host()}/ws/trackr/realtime/",
                "events": [
                    {
                        "event": event.decode().split(TRACKR_PREFIX)[-1],
                        "created_at": redis.get(event).decode(),
                        "count": int(redis.get(f"count_{event.decode()}") or 0),
                        "max": int(redis.get(f"max_{event.decode()}") or 0),
                    }
                    for event in redis.r.keys(pattern=f"{TRACKR_PREFIX}*")
                ],
            }
        )
