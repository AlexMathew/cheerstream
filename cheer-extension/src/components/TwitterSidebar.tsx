import React, { useEffect, useRef, useState } from 'react';
import { EventDetails, getEventAndMatchDetails } from '../utils/details';
import twickr from '../api/twickr';
import { AxiosResponse } from 'axios';
import { WebsocketResponse } from '../api/responseTypes';
import { WebsocketEvent } from '../utils/websocket';
import {
  DOMCustomEventType,
  HOTSTAR_DEFAULT_SPORT,
  MESSAGE_ACTIONS,
  TWEETS_LOCAL_STORAGE_PREFIX,
} from '../constants';
import { ChromeMessage, TwitterEmbedEvent } from '../types';

interface TwitterSidebarProps {
  setSocket: (ws: WebSocket) => void;
}

async function getWebsocket(eventDetails: EventDetails) {
  const wsResponse: AxiosResponse<WebsocketResponse> =
    await twickr.get<WebsocketResponse>(
      `/websocket/${eventDetails.sport}/${eventDetails.event}/${eventDetails.match}/`,
    );
  const socket: WebSocket = new WebSocket(wsResponse.data.websocket);
  return socket;
}

async function embedTweet(tweetId: string, newTweet: boolean) {
  const embedEvent: TwitterEmbedEvent = {
    tweetId,
    className: `twickr-sidebar-${tweetId}`,
    newTweet,
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

const TwitterSidebar: React.FC<TwitterSidebarProps> = ({ setSocket }) => {
  const [tweets, setTweets] = useState<string[]>([]);
  const tweetsRef = useRef(tweets);
  tweetsRef.current = tweets;
  const [tweetScrollPosition, setTweetScrollPosition] = useState<number>(0);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const showSidebarRef = useRef(showSidebar);
  showSidebarRef.current = showSidebar;
  const TWEET_COUNT_SHOWN_ON_SIDEBAR = 15;
  const TWEET_COUNT_IN_STATE = 75;
  const TWEET_COUNT_IN_STORAGE = 5;
  const eventDetails: EventDetails = getEventAndMatchDetails(
    document.location.pathname,
  );
  const fallbackSportTag: string =
    document.querySelector('.tag-holder .tag')?.textContent?.toLowerCase() ||
    '';
  if (eventDetails.sport === HOTSTAR_DEFAULT_SPORT) {
    eventDetails.sport = fallbackSportTag;
  }
  const localStorageKey = `${TWEETS_LOCAL_STORAGE_PREFIX}${eventDetails.sport}-${eventDetails.event}-${eventDetails.match}`;

  const getExistingTweetsFromStorage = (): string[] => {
    const tweetIdsString: string =
      localStorage.getItem(localStorageKey) || '[]';
    const tweetIds: string[] = JSON.parse(tweetIdsString);
    return tweetIds;
  };

  const addToStorage = (tweetId: string) => {
    const tweetIds: string[] = getExistingTweetsFromStorage();
    const updatedTweetIds: string[] = [
      ...tweetIds.slice(1 - TWEET_COUNT_IN_STORAGE),
      tweetId,
    ];
    localStorage.setItem(localStorageKey, JSON.stringify(updatedTweetIds));
  };

  const processTweet = (tweetId: string, newTweet: boolean) => {
    setTweets((tweets) => [
      tweetId,
      ...tweets.slice(0, TWEET_COUNT_IN_STATE - 1),
    ]);
    if (newTweet) {
      addToStorage(tweetId);
    }
    embedTweet(tweetId, newTweet);
    if (newTweet) {
      chrome.runtime.sendMessage<ChromeMessage>({
        action: MESSAGE_ACTIONS.GA_TWEET_EMBEDDED,
        data: {
          event: `${eventDetails.sport}-${eventDetails.event}-${eventDetails.match}`,
          tweetId,
        },
      });

      if (!showSidebarRef.current) {
        chrome.runtime.sendMessage<ChromeMessage>({
          action: MESSAGE_ACTIONS.GA_TWEET_EMBEDDED_WHEN_MINIMIZED,
          data: {
            event: `${eventDetails.sport}-${eventDetails.event}-${eventDetails.match}`,
            tweetId,
          },
        });
      }
    }
  };

  useEffect(() => {
    const connectToWebsocket = async () => {
      const tweetIds: string[] = getExistingTweetsFromStorage();
      tweetIds.forEach((tweetId) => processTweet(tweetId, false));
      const socket = await getWebsocket(eventDetails);
      setSocket(socket);
      chrome.runtime.sendMessage<ChromeMessage>({
        action: MESSAGE_ACTIONS.GA_SIDEBAR_LOADED,
        data: {
          event: `${eventDetails.sport}-${eventDetails.event}-${eventDetails.match}`,
        },
      });

      socket.onmessage = (e: MessageEvent<string>) => {
        const data: WebsocketEvent = JSON.parse(e.data);
        processTweet(data.message, true);
      };

      socket.onclose = () => {
        console.log('Socket closed'); // eslint-disable-line no-console
      };
    };

    connectToWebsocket();
  }, []);

  const poweredByWidth = getSidebarWidth();

  const minimizeSidebar = () => {
    setShowSidebar(false);
    const sidebarHolder: HTMLDivElement | null =
      document.querySelector<HTMLDivElement>('.twickr-sidebar-holder');
    if (sidebarHolder) {
      sidebarHolder.style.width = '5%';
    }
    chrome.runtime.sendMessage<ChromeMessage>({
      action: MESSAGE_ACTIONS.GA_SIDEBAR_MINIMIZED,
      data: {
        event: `${eventDetails.sport}-${eventDetails.event}-${eventDetails.match}`,
      },
    });
  };

  const restoreSidebar = () => {
    setShowSidebar(true);
    const sidebarHolder: HTMLDivElement | null =
      document.querySelector<HTMLDivElement>('.twickr-sidebar-holder');
    if (sidebarHolder) {
      sidebarHolder.style.width = '20%';
    }
    chrome.runtime.sendMessage<ChromeMessage>({
      action: MESSAGE_ACTIONS.GA_SIDEBAR_RESTORED,
      data: {
        event: `${eventDetails.sport}-${eventDetails.event}-${eventDetails.match}`,
      },
    });
  };

  const shouldShowTweet = (tweetIndex: number) => {
    return (
      tweetIndex >= tweetScrollPosition &&
      tweetIndex < tweetScrollPosition + TWEET_COUNT_SHOWN_ON_SIDEBAR
    );
  };

  const goNewer = () => {
    let newScrollPosition = tweetScrollPosition - TWEET_COUNT_SHOWN_ON_SIDEBAR;
    newScrollPosition = newScrollPosition > 0 ? newScrollPosition : 0;
    setTweetScrollPosition(newScrollPosition);
  };

  const goOlder = () => {
    const newScrollPosition =
      tweetScrollPosition + TWEET_COUNT_SHOWN_ON_SIDEBAR;
    setTweetScrollPosition(newScrollPosition);
  };

  const showSeeNewer = tweets.length > 0 && tweetScrollPosition != 0;
  const showSeeOlder =
    tweets.length > TWEET_COUNT_SHOWN_ON_SIDEBAR &&
    tweetScrollPosition < tweets.length - TWEET_COUNT_SHOWN_ON_SIDEBAR;

  const tweetsSection = (
    <>
      {showSeeNewer ? (
        <a
          className="twickr-sidebar-see-button twickr-sidebar-see-newer-button"
          onClick={goNewer}
        >
          See Newer ⬆
        </a>
      ) : null}
      {tweets.map((tweet, tweetIndex) => (
        <div
          className={`twickr-sidebar-${tweet}`}
          key={tweet}
          style={{ display: shouldShowTweet(tweetIndex) ? 'block' : 'none' }}
        ></div>
      ))}
      {showSeeOlder ? (
        <a
          className="twickr-sidebar-see-button twickr-sidebar-see-older-button"
          onClick={goOlder}
        >
          See Older ⬇
        </a>
      ) : null}
    </>
  );

  const tweetsPlaceholder = (
    <div
      className="twickr-sidebar-no-tweets"
      style={{
        position: 'absolute',
        top: 0,
        height: '25px',
        width: poweredByWidth,
        fontWeight: 'bold',
        background: 'whitesmoke',
        boxShadow: '0 8px 10px -6px black',
      }}
    >
      Waiting for live tweets to come in
    </div>
  );

  const minimizedSidebar = (
    <>
      <div
        className="twickr-sidebar"
        style={{ height: 'inherit', overflowY: 'scroll' }}
      >
        <div
          style={{
            height: '25px',
            background: 'whitesmoke',
            color: 'black',
            cursor: 'pointer',
            fontSize: 'small',
            fontWeight: 'bold',
          }}
          onClick={restoreSidebar}
        >
          &lt;&lt;
        </div>
      </div>
      <div
        className="twickr-sidebar-logo"
        style={{
          position: 'absolute',
          bottom: 0,
          background: 'whitesmoke',
          width: 'inherit',
        }}
      >
        <img
          src={chrome.runtime.getURL('icons/logo128.png')}
          style={{ width: '100%' }}
        />
      </div>
    </>
  );

  return (
    <>
      <div
        style={{ display: showSidebar ? 'block' : 'none', height: 'inherit' }}
      >
        <div
          style={{
            position: 'relative',
            top: 0,
            left: '-8%',
            height: '25px',
            background: 'whitesmoke',
            color: 'black',
            opacity: '50%',
            cursor: 'pointer',
            fontSize: 'small',
            fontWeight: 'bold',
            width: 'fit-content',
            paddingLeft: '5px',
            paddingRight: '5px',
            zIndex: 100,
          }}
          onClick={minimizeSidebar}
        >
          &gt;&gt;
        </div>
        <div
          className="twickr-sidebar"
          style={{ height: 'inherit', overflowY: 'scroll', marginTop: '-25px' }}
        >
          {tweets.length > 0 ? tweetsSection : tweetsPlaceholder}
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
      </div>
      {!showSidebar ? minimizedSidebar : ''}
    </>
  );
};

export default TwitterSidebar;
