import React, { useEffect, useState } from 'react';
import { EventDetails, getEventAndMatchDetails } from '../utils/details';
import twickr from '../api/twickr';
import { AxiosResponse } from 'axios';
import { WebsocketResponse } from '../api/responseTypes';
import { WebsocketEvent } from '../utils/websocket';
import { DOMCustomEventType } from '../constants';
import { TwitterEmbedEvent } from '../types';

interface TwitterSidebarProps {}

async function getWebsocket() {
  const eventDetails: EventDetails = getEventAndMatchDetails(
    document.location.pathname,
  );
  const wsResponse: AxiosResponse<WebsocketResponse> =
    await twickr.get<WebsocketResponse>(
      `/websocket/${eventDetails.sport}/${eventDetails.event}/${eventDetails.match}/`,
    );
  const socket: WebSocket = new WebSocket(wsResponse.data.websocket);
  return socket;
}

async function embedTweet(tweetId: string) {
  const embedEvent: TwitterEmbedEvent = {
    tweetId,
    className: `twickr-sidebar-${tweetId}`,
  };
  document.dispatchEvent(
    new CustomEvent<TwitterEmbedEvent>(DOMCustomEventType.TWITTER_EMBED, {
      detail: embedEvent,
    }),
  );
}

const TwitterSidebar: React.FC<TwitterSidebarProps> = ({}) => {
  const [tweets, setTweets] = useState<string[]>([]);

  useEffect(() => {
    const connectToWebsocket = async () => {
      const socket = await getWebsocket();
      socket.onmessage = (e: MessageEvent<string>) => {
        const data: WebsocketEvent = JSON.parse(e.data);
        setTweets((tweets) => [data.message, ...tweets]);
        embedTweet(data.message);
      };

      socket.onclose = () => {
        console.log('Socket closed');
      };
    };

    connectToWebsocket();
  }, []);

  return (
    <div
      className="twickr-sidebar"
      style={{ height: 'inherit', overflowY: 'scroll' }}
    >
      {tweets.map((tweet) => (
        <div className={`twickr-sidebar-${tweet}`} key={tweet}></div>
      ))}
    </div>
  );
};

export default TwitterSidebar;
