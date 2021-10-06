import React from 'react';
import ReactDOM from 'react-dom';
import ContentScript from './components/ContentScript';

const reactRoot: HTMLDivElement = document.createElement('div');
reactRoot.classList.add('twickr-root');
document.querySelector('body')?.append(reactRoot);

var s = document.createElement('script');
s.src = chrome.runtime.getURL('js/twitter_embed.js');
s.onload = function () {
  // @ts-ignore
  this.remove();
};
(document.head || document.documentElement).appendChild(s);

ReactDOM.render(<ContentScript />, reactRoot);
