from django.urls import re_path
from django.urls.conf import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(
        r"ws/(?P<sport>[\w\-]+)/(?P<event>[\w\-]+)/(?P<match>[\w\-]+)/$",
        consumers.TwickrConsumer.as_asgi(),
    ),
]
