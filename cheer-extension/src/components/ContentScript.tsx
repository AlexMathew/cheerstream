import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { getByXpath } from '../utils/xpath';
import { EventDetails, getEventAndMatchDetails } from '../utils/details';
import { EVENTS, SPORTS } from '../constants';
import TwitterSidebar from './TwitterSidebar';

MutationObserver = window.MutationObserver;

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
    sidebar.style.background = 'white';
    sidebar.style.color = 'black';

    watchAreaInner?.appendChild(sidebar);
    ReactDOM.render(<TwitterSidebar />, sidebar);
  }
};

const shouldInsertSidebarForEvent = (): boolean => {
  const eventDetails: EventDetails = getEventAndMatchDetails(
    document.location.pathname,
  );

  return (
    eventDetails.sport === SPORTS.FOOTBALL || eventDetails.event === EVENTS.IPL
  );
};

const ContentScript: React.FC = () => {
  useEffect(() => {
    var observer = new MutationObserver(() => {
      const playerBase: Node | null = getByXpath(`//div[@class="player-base"]`);

      if (playerBase) {
        const liveStreamBadge = document.querySelector('.live-watermark-badge');
        if ((liveStreamBadge && shouldInsertSidebarForEvent()) || true) {
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
