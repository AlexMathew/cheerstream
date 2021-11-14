from django.urls import path

from .views import MostRecentTweetView, TwitterEmbedView, WebsocketView

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
    path("recent/", MostRecentTweetView.as_view(), name="most-recent-tweet-view"),
]
