// @ts-nocheck
import { DOMCustomEventType } from './constants';
import { TwitterEmbedEvent } from './types';

window.twttr = (function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://platform.twitter.com/widgets.js';
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function (f) {
    t._e.push(f);
  };

  return t;
})(document, 'script', 'twitter-wjs');

document.addEventListener(
  DOMCustomEventType.TWITTER_EMBED,
  function (e: CustomEvent<TwitterEmbedEvent>) {
    const embedDetails = e.detail;

    setTimeout(
      () =>
        window.twttr.widgets.createTweet(
          embedDetails.tweetId,
          document.getElementsByClassName(embedDetails.className)[0],
          {
            align: 'center',
          },
        ),
      30 * 1000,
    );
  },
);

export {};
