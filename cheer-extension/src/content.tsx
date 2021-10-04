import React from 'react';
import ReactDOM from 'react-dom';
import ContentScript from './components/ContentScript';

const reactRoot: HTMLDivElement = document.createElement('div');
reactRoot.classList.add('twickr-root');
document.querySelector('body')?.append(reactRoot);

ReactDOM.render(<ContentScript />, reactRoot);
