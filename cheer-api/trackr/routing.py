from django.urls import re_path
from django.urls.conf import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(
        r"ws/trackr/realtime/$",
        consumers.TrackrConsumer.as_asgi(),
    ),
]
