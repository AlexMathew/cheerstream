import json

from channels.generic.websocket import AsyncWebsocketConsumer

from .constants import DEFAULT_VALUE
from .twitter import services as twitter_services


class TwickrConsumer(AsyncWebsocketConsumer):
    @property
    def group_names(self):
        return [
            self.sport,
            self.event,
            *self.sport_twitter.get_teams_from_match(self.match).values(),
        ]

    async def connect(self):
        self.sport = self.scope["url_route"]["kwargs"]["sport"]
        self.event = self.scope["url_route"]["kwargs"]["event"]
        self.match = self.scope["url_route"]["kwargs"]["match"]
        self.sport_twitter = twitter_services.get(
            self.sport, event=self.event if self.event != DEFAULT_VALUE else None
        )

        for group in self.group_names:
            await self.channel_layer.group_add(group, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        for group in self.group_names:
            await self.channel_layer.group_discard(group, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        for group in self.group_names:
            await self.channel_layer.group_send(
                group, {"type": "event_message", "message": message}
            )

    async def event_message(self, event):
        message = event["message"]

        await self.send(text_data=json.dumps({"message": message}))