import React, { useEffect } from 'react';
import { getByXpath } from '../utils/xpath';
import { EventDetails, getEventAndMatchDetails } from '../utils/details';
import twickr from '../api/twickr';
import { AxiosResponse } from 'axios';
import { WebsocketResponse } from '../api/responseTypes';

MutationObserver = window.MutationObserver;

const insertTweetSidebar = (playerBase: Node) => {
  const existingSidebar: Node | null = getByXpath(
    `//div[@class="cheerstream-sidebar"]`,
  );
  if (!existingSidebar) {
    const watchAreaInner: HTMLElement | null = playerBase.parentElement;
    watchAreaInner ? (watchAreaInner.style.display = 'flex') : null;
    const sidebar = document.createElement('div');
    sidebar.classList.add('cheerstream-sidebar');
    sidebar.style.width = '20%';
    sidebar.style.background = 'white';
    sidebar.style.color = 'black';

    watchAreaInner?.appendChild(sidebar);
    connectToWebsocket();
  }
};

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
    const sidebar: Node | null = getByXpath(
      `//div[@class="cheerstream-sidebar"]`,
    );

    if (sidebar) {
      sidebar.textContent += `TWEET: ${e.data}`;
    }
  };

  socket.onclose = () => {
    console.log('Socket closed');
  };
};

const ContentScript: React.FC = () => {
  useEffect(() => {
    var observer = new MutationObserver(() => {
      const playerBase: Node | null = getByXpath(`//div[@class="player-base"]`);

      if (playerBase) {
        const liveStreamBadge = document.querySelector('.live-watermark-badge');
        if (liveStreamBadge || true) {
          insertTweetSidebar(playerBase);
        }
      }
    });
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  }, []);

  return <></>;
};

export default ContentScript;
