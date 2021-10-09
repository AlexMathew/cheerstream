from django.urls import path

from .views import RealtimeStatsView

urlpatterns = [
    path(
        "stats/",
        RealtimeStatsView.as_view(),
        name="realtime-stats-view",
    )
]
