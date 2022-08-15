import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import store from './redux/store';

import './sass/main.scss';

Sentry.init({
  dsn: "https://ba75614424c4415ca0acc2a5748e7133@o679108.ingest.sentry.io/5844726",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
