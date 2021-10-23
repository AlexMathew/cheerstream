export interface TwitterEmbedEvent {
  tweetId: string;
  className: string;
  newTweet: boolean;
}

export interface ChromeMessage {
  action: string;
  data: {
    event?: string;
    tweetId?: string;
  };
}
