from django.urls import path

from .views import WebsocketView

urlpatterns = [
    path(
        "websocket/<str:sport>/<str:event>/<str:match>/",
        WebsocketView.as_view(),
        name="websocket-view",
    )
]
