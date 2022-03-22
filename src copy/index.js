import { ApolloProvider } from '@apollo/client';
import { MuiThemeProvider } from '@material-ui/core';
import * as Sentry from '@sentry/react';
import i18n from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom';
import { initReactI18next } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import { IntercomProvider } from 'react-use-intercom';
import './assets/fonts/HelveticaNowDisplayBd/font.woff';
import './assets/fonts/HelveticaNowDisplayBd/font.woff2';
import './assets/fonts/HelveticaNowDisplayMd/font.woff';
import './assets/fonts/HelveticaNowDisplayMd/font.woff2';
import './assets/fonts/HelveticaNowDisplayRegular/font.woff';
import './assets/fonts/HelveticaNowDisplayRegular/font.woff2';
import { Userpilot } from 'userpilot';
import client from './client';
import { APP_NAME, APP_VERSION, SENTRY_DSN, SENTRY_ENV } from './constants/api';
import App from './containers/App';
import './index.css';
import { resources } from './localization';
import ThemeUtils from './utils/ThemeUtils';

(async () => {
  await i18n.use(initReactI18next).init({ resources, lng: 'en' });
})();

if (SENTRY_ENV !== 'development') {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: SENTRY_ENV,
    release: `${APP_VERSION}@${APP_NAME}`,
  });
}

// DEV only. On production CSP is enforced via Content-Security-Policy header.
if (process.env.NODE_ENV === 'development') {
  // Must be aligned with public/_headers

  const scriptSrcOrigins = [
    'app.termly.io',
    'js.stripe.com',
    '*.netlify.app',
    // intercom: https://www.intercom.com/help/en/articles/3894-using-intercom-with-content-security-policy
    'js.intercomcdn.com',
    '*.intercom.io',
    // google https://developers.google.com/tag-manager/web/csp
    'www.googletagmanager.com',
    'www.googleadservices.com',
    '*.google-analytics.com',
    'www.google.com',
    'googleads.g.doubleclick.net',
    // userpilot
    '*.userpilot.io',
  ];

  const connectSrcOrigins = [
    'localhost:10004',
    '*.whenthen.co',
    '*.whenthen.com',
    '*.amazonaws.com',
    'app.termly.io',
    'www.google-analytics.com',
    'm.stripe.com',
    '*.sentry.io',
    '*.intercom.io',
    '*.intercomcdn.com',
    '*.intercomusercontent.com',
    'wss://*.intercom.io',
    '*.graphcms.com',
    '*.launchdarkly.com',
    'http://54.202.214.2', // TODO: Remove
    '*.userpilot.io wss://analytex.userpilot.io',
    'player.vimeo.com',
  ];

  const securityPolicies = [
    `default-src 'self';`,
    `script-src 'self' 'unsafe-inline' ${scriptSrcOrigins.join(' ')};`,
    `style-src 'self' 'unsafe-inline' fonts.googleapis.com;`,
    `img-src * blob: data:;`,
    `font-src 'self' data: fonts.gstatic.com js.intercomcdn.com;`,
    `media-src 'self' js.intercomcdn.com media.graphcms.com *.whenthen.com;`,
    `form-action 'self' intercom.help api-iam.intercom.io;`,
    `frame-src 'self' js.stripe.com app.netlify.com bid.g.doubleclick.net player.vimeo.com intercom-sheets.com;`,
    `child-src 'self' intercom-sheets.com www.intercom-reporting.com www.youtube.com player.vimeo.com fast.wistia.net;`,
    `connect-src 'self' ${connectSrcOrigins.join(' ')};`,
  ];

  const contentSecurityPolicyMeta = document.createElement('meta');
  contentSecurityPolicyMeta.setAttribute('http-equiv', 'Content-Security-Policy');
  contentSecurityPolicyMeta.setAttribute('content', securityPolicies.join(' '));
  document.head.appendChild(contentSecurityPolicyMeta);
}

const USERPILOT_TOKEN = process.env.REACT_APP_USERPILOT_TOKEN;

if (USERPILOT_TOKEN) {
  Userpilot.initialize(USERPILOT_TOKEN);
}

ReactDOM.render(
  <MuiThemeProvider theme={ThemeUtils}>
    <ApolloProvider client={client}>
      <Router>
        <IntercomProvider appId={process.env.REACT_APP_INTERCOM_ID} initializeDelay={300}>
          <App />
        </IntercomProvider>
      </Router>
    </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
