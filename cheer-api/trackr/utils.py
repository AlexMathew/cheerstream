import redis
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from helpers.instances import redis as redis_instance

from .constants import COUNT_FOR_EVENT_KEY, MAX_FOR_EVENT_KEY
from .consumers import TrackrConsumer

CHANNEL_LAYER = get_channel_layer()


def websocket_send(event: str, count_update: int):
    async_to_sync(CHANNEL_LAYER.group_send)(
        TrackrConsumer.GROUP_NAME,
        {
            "type": "event_message",
            "message": {"event": event, "count_update": count_update},
        },
    )


def log_connect(event: str):
    count_key = COUNT_FOR_EVENT_KEY(event)
    max_key = MAX_FOR_EVENT_KEY(event)
    pipeline: redis.client.Pipeline = redis_instance.r.pipeline()
    pipeline.watch(count_key)
    pipeline.watch(max_key)
    current_count = int(pipeline.get(count_key) or 0)
    current_max = int(pipeline.get(max_key) or 0)
    pipeline.multi()
    pipeline.incr(count_key)
    if current_count + 1 > current_max:
        pipeline.set(max_key, current_count + 1)
    pipeline.execute()
    # websocket_send(event=event, count_update=+1)


def log_disconnect(event: str):
    count_key = COUNT_FOR_EVENT_KEY(event)
    pipeline: redis.client.Pipeline = redis_instance.r.pipeline()
    pipeline.decr(count_key)
    pipeline.execute()
    # websocket_send(event=event, count_update=-1)
