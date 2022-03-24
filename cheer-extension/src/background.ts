// @ts-nocheck
// import posthog from 'posthog-js';
import { MESSAGE_ACTIONS } from './constants';
import { ChromeMessage } from './types';

// (function (i, s, o, g, r, a, m) {
//   i['GoogleAnalyticsObject'] = r;
//   (i[r] =
//     i[r] ||
//     function () {
//       (i[r].q = i[r].q || []).push(arguments);
//     }),
//     (i[r].l = 1 * new Date());
//   (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
//   a.async = 1;
//   a.src = g;
//   m.parentNode.insertBefore(a, m);
// })(
//   window,
//   document,
//   'script',
//   'https://www.google-analytics.com/analytics.js',
//   'ga',
// );

// ga('create', 'UA-210868356-1', 'auto');

// // Modifications:
// ga('set', 'checkProtocolTask', null);

// posthog.init(process.env.POSTHOG_API_KEY, {
//   api_host: process.env.POSTHOG_API_HOST,
// });

const GA_ID = 'UA-210868356-1';

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return response;
}

const registerEvent = async (
  category: string,
  action: string = '',
  label: string = '',
) => {
  const url = `https://www.google-analytics.com/collect?v=1&t=event&tid=${GA_ID}&cid=555&ec=${category}&ea=${action}&el=${label}`;
  postData(url).then((resp) => {
    console.log(resp.ok);
  });
};

chrome.runtime.onMessage.addListener((message: ChromeMessage) => {
  switch (message.action) {
    case MESSAGE_ACTIONS.GA_SIDEBAR_LOADED:
      console.log('Sidebar loaded - ', message.data);
      registerEvent('sidebar_connect', message.data.event);
      // ga('send', 'event', 'sidebar', message.data.event, {
      //   nonInteraction: true,
      // });
      // posthog.capture('sidebar_loaded', { matchEvent: message.data.event });
      break;
    case MESSAGE_ACTIONS.GA_TWEET_EMBEDDED:
      console.log('Tweet embedded');
      registerEvent('tweet_embed', message.data.event, message.data.tweetId);
      // ga('send', 'event', 'tweet', 'embed', {
      //   nonInteraction: true,
      // });
      // posthog.capture('tweet_embedded', {
      //   matchEvent: message.data.event,
      //   tweetId: message.data.tweetId,
      // });
      break;
    case MESSAGE_ACTIONS.GA_TWEET_EMBEDDED_WHEN_MINIMIZED:
      console.log('Tweet embedded when minimized');
      registerEvent(
        'tweet_embed_when_minimized',
        message.data.event,
        message.data.tweetId,
      );
      break;
    case MESSAGE_ACTIONS.GA_SIDEBAR_DISCONNECTED:
      console.log('Sidebar disconnected');
      registerEvent('sidebar_disconnect', 'disconnect');
      // ga('send', 'event', 'sidebar', 'disconnect', {
      //   nonInteraction: true,
      // });
      // posthog.capture('sidebar_disconnected');
      break;
    case MESSAGE_ACTIONS.GA_SIDEBAR_MINIMIZED:
      console.log('Sidebar minimized - ', message.data);
      registerEvent('sidebar_minimized', message.data.event);
      break;
    case MESSAGE_ACTIONS.GA_SIDEBAR_RESTORED:
      console.log('Sidebar restored - ', message.data);
      registerEvent('sidebar_restored', message.data.event);
      break;
  }
});

export {};
