from django.urls import re_path
from django.urls.conf import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(
        r"ws/(?P<event_name>\w+)/(?P<match_name>\w+)/$",
        consumers.TwickrConsumer.as_asgi(),
    ),
]
