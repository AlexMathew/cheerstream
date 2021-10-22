import React, { useEffect, useState } from 'react';
import { EventDetails, getEventAndMatchDetails } from '../utils/details';
import twickr from '../api/twickr';
import { AxiosResponse } from 'axios';
import { WebsocketResponse } from '../api/responseTypes';
import { WebsocketEvent } from '../utils/websocket';
import { DOMCustomEventType, TWEETS_LOCAL_STORAGE_PREFIX } from '../constants';
import { TwitterEmbedEvent } from '../types';

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
  const eventDetails: EventDetails = getEventAndMatchDetails(
    document.location.pathname,
  );
  const localStorageKey = `${TWEETS_LOCAL_STORAGE_PREFIX}${eventDetails.sport}-${eventDetails.event}-${eventDetails.match}`;

  const getExistingTweetsFromStorage = (): string[] => {
    const tweetIdsString: string =
      localStorage.getItem(localStorageKey) || '[]';
    const tweetIds: string[] = JSON.parse(tweetIdsString);
    return tweetIds;
  };

  const addToStorage = (tweetId: string) => {
    const tweetIds: string[] = getExistingTweetsFromStorage();
    const updatedTweetIds: string[] = [...tweetIds, tweetId];
    localStorage.setItem(localStorageKey, JSON.stringify(updatedTweetIds));
  };

  const processTweet = (tweetId: string, newTweet: boolean) => {
    setTweets((tweets) => [tweetId, ...tweets]);
    if (newTweet) {
      addToStorage(tweetId);
    }
    embedTweet(tweetId, newTweet);
  };

  useEffect(() => {
    const connectToWebsocket = async () => {
      const tweetIds: string[] = getExistingTweetsFromStorage();
      tweetIds.forEach((tweetId) => processTweet(tweetId, false));
      const socket = await getWebsocket(eventDetails);
      setSocket(socket);
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

  return (
    <>
      <div
        className="twickr-sidebar"
        style={{ height: 'inherit', overflowY: 'scroll' }}
      >
        {tweets.length > 0 ? (
          tweets.map((tweet) => (
            <div className={`twickr-sidebar-${tweet}`} key={tweet}></div>
          ))
        ) : (
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
        )}
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
