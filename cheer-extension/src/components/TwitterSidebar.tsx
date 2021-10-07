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

function getSidebarWidth() {
  const sidebarHolder: HTMLDivElement | null =
    document.querySelector<HTMLDivElement>('.twickr-sidebar-holder');
  return `${sidebarHolder?.offsetWidth}px` ?? 'inherit';
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

  const poweredByWidth = getSidebarWidth();

  return (
    <>
      <div
        className="twickr-sidebar"
        style={{ height: 'inherit', overflowY: 'scroll' }}
      >
        {tweets.map((tweet) => (
          <div className={`twickr-sidebar-${tweet}`} key={tweet}></div>
        ))}
      </div>
      <div
        className="twickr-sidebar-powered-by"
        style={{
          position: 'absolute',
          bottom: 0,
          height: '20px',
          width: poweredByWidth,
          fontWeight: 'bold',
          background: 'whitesmoke',
          boxShadow: '0 -8px 10px -6px black',
        }}
      >
        Powered by Twickr
      </div>
    </>
  );
};

export default TwitterSidebar;
