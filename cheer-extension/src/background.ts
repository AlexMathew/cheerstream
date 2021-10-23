// @ts-nocheck
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

chrome.runtime.onMessage.addListener((message: ChromeMessage) => {
  switch (message.action) {
    case MESSAGE_ACTIONS.GA_SIDEBAR_LOADED:
      console.log('Sidebar loaded - ', message.data);
      ga('send', 'event', 'sidebar', message.data.event, {
        nonInteraction: true,
      });
      break;
    case MESSAGE_ACTIONS.GA_TWEET_EMBEDDED:
      console.log('Tweet embedded');
      ga('send', 'event', 'tweet', 'embed', {
        nonInteraction: true,
      });
      break;
  }
});

export {};
