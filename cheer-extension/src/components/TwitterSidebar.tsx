import React, { useEffect, useState } from 'react';
import { EventDetails, getEventAndMatchDetails } from '../utils/details';
import twickr from '../api/twickr';
import { AxiosResponse } from 'axios';
import { WebsocketResponse } from '../api/responseTypes';
import { WebsocketEvent } from '../utils/websocket';

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

const TwitterSidebar: React.FC<TwitterSidebarProps> = ({}) => {
  const TEMPORARY_TWEETS_FOR_TESTING = [
    '1445453394886283276',
    '1445456251748503553',
    '1445448408412475400',
  ];
  const [tweets, setTweets] = useState<string[]>([
    ...TEMPORARY_TWEETS_FOR_TESTING,
  ]);

  useEffect(() => {
    const connectToWebsocket = async () => {
      const socket = await getWebsocket();
      socket.onmessage = (e: MessageEvent<string>) => {
        const data: WebsocketEvent = JSON.parse(e.data);
        setTweets((tweets) => [data.message, ...tweets]);
      };

      socket.onclose = () => {
        console.log('Socket closed');
      };
    };

    connectToWebsocket();
  }, []);

  return (
    <div className="twickr-sidebar">
      {tweets.map((tweet, idx) => (
        <div key={idx}>{tweet}</div>
      ))}
    </div>
  );
};

export default TwitterSidebar;
