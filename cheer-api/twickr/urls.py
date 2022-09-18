from django.urls import path

from .views import (
    MostRecentTweetView,
    PromptHeroGumroadPingView,
    PromptHeroUserParametersView,
    TwitterEmbedView,
    WebsocketView,
)

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
    path(
        "prompthero-ping/",
        PromptHeroGumroadPingView.as_view(),
        name="prompthero-gumroad-ping",
    ),
    path(
        "prompthero-get/",
        PromptHeroUserParametersView.as_view(),
        name="prompthero-get-parameters",
    ),
]
