import json

from channels.generic.websocket import AsyncWebsocketConsumer


class TrackrConsumer(AsyncWebsocketConsumer):
    GROUP_NAME = "trackr_realtime"

    async def connect(self):
        await self.channel_layer.group_add(self.GROUP_NAME, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.GROUP_NAME, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        await self.channel_layer.group_send(
            self.GROUP_NAME, {"type": "event_message", "message": message}
        )

    async def event_message(self, event):
        message = event["message"]

        await self.send(text_data=json.dumps({"message": message}))
