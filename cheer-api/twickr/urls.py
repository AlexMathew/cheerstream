from django.urls import path

from .views import TwitterEmbedView, WebsocketView

urlpatterns = [
    path(
        "websocket/<str:sport>/<str:event>/<str:match>/",
        WebsocketView.as_view(),
        name="websocket-view",
    ),
    path(
        "twitter_embed/",
        TwitterEmbedView.as_view(),
        name="twitter-embed-view",
    ),
]
