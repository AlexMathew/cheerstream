import React, { useEffect } from 'react';
import { getByXpath } from '../utils/xpath';

MutationObserver = window.MutationObserver;

const insertTweetSidebar = (playerBase: Node) => {
  const existingSidebar: Node | null = getByXpath(
    `//div[@class="cheerstream-sidebar"]`,
  );
  if (!existingSidebar) {
    const watchAreaInner: HTMLElement | null = playerBase.parentElement;
    watchAreaInner ? (watchAreaInner.style.display = 'flex') : null;
    const sidebar = document.createElement('div');
    sidebar.innerText = 'Twitter';
    sidebar.classList.add('cheerstream-sidebar');
    sidebar.style.width = '20%';
    sidebar.style.background = 'white';
    sidebar.style.color = 'black';

    watchAreaInner?.appendChild(sidebar);
  }
};

const ContentScript: React.FC = () => {
  useEffect(() => {
    var observer = new MutationObserver(() => {
      const playerBase: Node | null = getByXpath(`//div[@class="player-base"]`);

      if (playerBase) {
        const url: string = document.URL;

        if (url.indexOf('/live-streaming') !== -1) {
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
