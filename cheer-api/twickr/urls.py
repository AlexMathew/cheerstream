from django.urls import path

from .views import WebsocketView

urlpatterns = [
    path(
        "websocket/<str:event_name>/<str:match_name>/",
        WebsocketView.as_view(),
        name="websocket-view",
    )
]
