// import './wdyr';

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';

import { AppProviders } from 'context';
import { App } from './app';

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root'),
);
