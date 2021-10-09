from django.http.request import HttpRequest
from django.http.response import JsonResponse
from django.views import View


class RealtimeStatsView(View):
    def get(self, request: HttpRequest, *args, **kwargs):
        return JsonResponse({})
