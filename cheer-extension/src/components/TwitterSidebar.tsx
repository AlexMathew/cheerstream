import React, { useEffect, useState } from 'react';
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
  const [tweetScrollPosition, setTweetScrollPosition] = useState<number>(0);
  const TWEET_COUNT = 25;
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
    const updatedTweetIds: string[] = [...tweetIds.slice(-4), tweetId];
    localStorage.setItem(localStorageKey, JSON.stringify(updatedTweetIds));
  };

  const processTweet = (tweetId: string, newTweet: boolean) => {
    setTweets((tweets) => [tweetId, ...tweets]);
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

  const shouldShowTweet = (tweetIndex: number) => {
    return (
      tweetIndex >= tweetScrollPosition &&
      tweetIndex < tweetScrollPosition + TWEET_COUNT
    );
  };

  const goNewer = () => {
    let newScrollPosition = tweetScrollPosition - TWEET_COUNT;
    newScrollPosition = newScrollPosition > 0 ? newScrollPosition : 0;
    setTweetScrollPosition(newScrollPosition);
  };

  const goOlder = () => {
    const newScrollPosition = tweetScrollPosition + TWEET_COUNT;
    setTweetScrollPosition(newScrollPosition);
  };

  const showSeeNewer = tweets.length > 0 && tweetScrollPosition != 0;
  const showSeeOlder =
    tweets.length > TWEET_COUNT &&
    tweetScrollPosition < tweets.length - TWEET_COUNT;

  const tweetsSection = (
    <>
      {showSeeNewer ? (
        <a
          className="twickr-sidebar-see-button twickr-sidebar-see-newer-button"
          onClick={goNewer}
        >
          See newer ⬆
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
          See older ⬇
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
        height: '20px',
        width: poweredByWidth,
        fontWeight: 'bold',
        background: 'whitesmoke',
        boxShadow: '0 8px 10px -6px black',
      }}
    >
      Waiting for live tweets to come in
    </div>
  );

  return (
    <>
      <div
        className="twickr-sidebar"
        style={{ height: 'inherit', overflowY: 'scroll' }}
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
    </>
  );
};

export default TwitterSidebar;
