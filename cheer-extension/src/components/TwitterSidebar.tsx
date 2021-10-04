import React, { useEffect } from 'react';
import { getByXpath } from '../utils/xpath';
import { EventDetails, getEventAndMatchDetails } from '../utils/details';
import twickr from '../api/twickr';
import { AxiosResponse } from 'axios';
import { WebsocketResponse } from '../api/responseTypes';

interface TwitterSidebarProps {}

const connectToWebsocket = async () => {
  const eventDetails: EventDetails = getEventAndMatchDetails(
    document.location.pathname,
  );
  const wsResponse: AxiosResponse<WebsocketResponse> =
    await twickr.get<WebsocketResponse>(
      `/websocket/${eventDetails.sport}/${eventDetails.event}/${eventDetails.match}/`,
    );
  const socket: WebSocket = new WebSocket(wsResponse.data.websocket);
  socket.onmessage = (e: MessageEvent) => {
    const sidebar: Node | null = getByXpath(`//div[@class="twickr-sidebar"]`);

    if (sidebar) {
      sidebar.textContent += `TWEET: ${e.data}`;
    }
  };

  socket.onclose = () => {
    console.log('Socket closed');
  };
};

const TwitterSidebar: React.FC<TwitterSidebarProps> = ({}) => {
  useEffect(() => {
    connectToWebsocket();
  }, []);

  return <div className="twickr-sidebar"></div>;
};

export default TwitterSidebar;
