// @ts-nocheck
import posthog from 'posthog-js';
import { MESSAGE_ACTIONS } from './constants';
import { ChromeMessage } from './types';

(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  (i[r] =
    i[r] ||
    function () {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(
  window,
  document,
  'script',
  'https://www.google-analytics.com/analytics.js',
  'ga',
);

ga('create', 'UA-210868356-1', 'auto');

// Modifications:
ga('set', 'checkProtocolTask', null);

posthog.init(process.env.POSTHOG_API_KEY, {
  api_host: process.env.POSTHOG_API_HOST,
});

chrome.runtime.onMessage.addListener((message: ChromeMessage) => {
  switch (message.action) {
    case MESSAGE_ACTIONS.GA_SIDEBAR_LOADED:
      console.log('Sidebar loaded - ', message.data);
      ga('send', 'event', 'sidebar', message.data.event, {
        nonInteraction: true,
      });
      posthog.capture('sidebar_loaded', { matchEvent: message.data.event });
      break;
    case MESSAGE_ACTIONS.GA_TWEET_EMBEDDED:
      console.log('Tweet embedded');
      ga('send', 'event', 'tweet', 'embed', {
        nonInteraction: true,
      });
      posthog.capture('tweet_embedded', {
        matchEvent: message.data.event,
        tweetId: message.data.tweetId,
      });
      break;
    case MESSAGE_ACTIONS.GA_SIDEBAR_DISCONNECTED:
      console.log('Sidebar disconnected');
      ga('send', 'event', 'sidebar', 'disconnect', {
        nonInteraction: true,
      });
      posthog.capture('sidebar_disconnected');
      break;
  }
});

export {};
