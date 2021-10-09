export interface WebsocketMessage {
  event: string;
  count_update: number;
}

export type WebsocketEvent = {
  message: WebsocketMessage;
};
