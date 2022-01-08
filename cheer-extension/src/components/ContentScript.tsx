import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { getByXpath } from '../utils/xpath';
import { EventDetails, getEventAndMatchDetails } from '../utils/details';
import {
  FALLBACK_SUPPORTED_SPORTS,
  HOTSTAR_DEFAULT_SPORT,
  MESSAGE_ACTIONS,
  SUPPORTED_EVENTS,
  SUPPORTED_SPORTS,
} from '../constants';
import TwitterSidebar from './TwitterSidebar';
import { ChromeMessage } from '../types';

MutationObserver = window.MutationObserver;

let SOCKET: WebSocket | null = null;

const setSocket = (ws: WebSocket) => {
  SOCKET = ws;
};

const closeSocket = () => {
  SOCKET ? SOCKET.close() : null;
  chrome.runtime.sendMessage<ChromeMessage>({
    action: MESSAGE_ACTIONS.GA_SIDEBAR_DISCONNECTED,
    data: {},
  });
};

const insertTweetSidebar = (playerBase: Node) => {
  const existingSidebar: Node | null = getByXpath(
    `//div[@class="twickr-sidebar-holder"]`,
  );
  if (!existingSidebar) {
    const watchAreaInner: HTMLElement | null = playerBase.parentElement;
    watchAreaInner ? (watchAreaInner.style.display = 'flex') : null;
    const sidebar = document.createElement('div');
    sidebar.classList.add('twickr-sidebar-holder');
    sidebar.style.width = '20%';
    sidebar.style.background = 'transparent';
    sidebar.style.color = 'black';
    sidebar.style.height = `${watchAreaInner?.offsetHeight}px` ?? 'auto';

    watchAreaInner?.appendChild(sidebar);
    ReactDOM.render(<TwitterSidebar setSocket={setSocket} />, sidebar);
  }
};

const shouldInsertSidebarForEvent = (): boolean => {
  const eventDetails: EventDetails = getEventAndMatchDetails(
    document.location.pathname,
  );
  const fallbackSportTag: string =
    document.querySelector('.tag-holder .tag')?.textContent?.toLowerCase() ||
    '';

  return (
    SUPPORTED_SPORTS.includes(eventDetails.sport) ||
    SUPPORTED_EVENTS.includes(eventDetails.event) ||
    (eventDetails.sport === HOTSTAR_DEFAULT_SPORT &&
      FALLBACK_SUPPORTED_SPORTS.includes(fallbackSportTag))
  );
};

const ContentScript: React.FC = () => {
  const [sidebarAdded, setSidebarAdded] = useState<boolean>(false);
  const sidebarRef = useRef(sidebarAdded);
  sidebarRef.current = sidebarAdded;

  useEffect(() => {
    var observer = new MutationObserver(() => {
      const playerBase: Node | null = getByXpath(`//div[@class="player-base"]`);

      if (playerBase && !sidebarRef.current) {
        const liveStreamBadge = document.querySelector('.live-watermark-badge');
        if ((liveStreamBadge && shouldInsertSidebarForEvent()) || false) {
          insertTweetSidebar(playerBase);
          setSidebarAdded(true);
        }
      } else if (!playerBase && sidebarRef.current) {
        setSidebarAdded(false);
        closeSocket();
      }
    });
    // setTimeout(
    //   () =>
    //     observer.observe(document, {
    //       childList: true,
    //       subtree: true,
    //     }),
    //   2 * 1000,
    // );
  }, []);

  return <></>;
};

export default ContentScript;
