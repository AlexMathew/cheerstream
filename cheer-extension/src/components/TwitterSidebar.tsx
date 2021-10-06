import React, { useEffect, useState } from 'react';
import { getByXpath } from '../utils/xpath';
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
  const [tweets, setTweets] = useState<Array<string>>([]);

  useEffect(() => {
    const connectToWebsocket = async () => {
      const socket = await getWebsocket();
      socket.onmessage = (e: MessageEvent<WebsocketEvent>) => {
        const tweetsCopy = [e.data.message, ...tweets];
        setTweets(tweetsCopy);
      };

      socket.onclose = () => {
        console.log('Socket closed');
      };
    };

    connectToWebsocket();
  }, []);

  return <div className="twickr-sidebar"></div>;
};

export default TwitterSidebar;
