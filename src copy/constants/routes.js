import { matchPath } from 'react-router-dom';
import { AUTOMATION_PERMISSIONS_IDS } from '../pages/MVPAutomation/permissions';
import { SETTINGS_PERMISSIONS_IDS } from '../pages/Settings/permissions';
import { GETTING_STARTED_PERMISSIONS_IDS } from '../pages/GettingStarted/permissions';
import { PAYMENTS_PERMISSIONS_IDS } from '../pages/Payments/permissions';
import { ROUTE_FEATURE_KEYS } from './routeFeatureKeys';

import { LANDING_URL } from './api';
import { FEATURE_TOGGLES_KEYS } from './featureToggles';

const UI_ROUTES = {
  root: '',
  home: '/getting-started',
  transactionsPast: '/transactions/past',
  transactionsFuture: '/transactions/future',
  spendRequest: '/one-time-spend',
  settings: '/billing',
  brandCenter: '/settings/elements/brand-center',
  emails: '/settings/elements/emails',
  auth: '/auth',
  slackAuth: '/auth/slack',
  signUp: '/signUp',
  signUpSurvey: '/signup-survey',
  signUpPersonalDetails: '/signUp/personal-details',
  signUpCompanyDetails: '/signUp/company-details',
  signIn: '/signIn',
  signInEmail: '/signInEmail',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  emailConfirmation: '/email-confirm',
  betaAccessCode: '/beta-access-code',
  planSelection: '/select-plan',
  pilotAgreement: `${LANDING_URL}pilot-agreement`,
  termsOfService: `${LANDING_URL}terms-and-conditions`,
  policyNotice: `${LANDING_URL}privacy-policy`,
  gdprStatement: `${LANDING_URL}data-protection`,
  installSlack: '/install/slack',
  invite: '/invitation',
  addBillingCard: '/add-card',
  addToSlack: '/add-slack',
  confirmDetails: '/company-details',

  dataTables: '/data-tables',
  customersDataTables: '/data-tables/customers',
  cardsDataTables: '/data-tables/cards',
  payments: '/payments',
  paymentIssues: '/payments/payment-issues',

  userManagement: '/settings/directory',
  connectFromPublicSite: '/connections/connect',
  developers: '/settings/developers',
  intents: '/payments/payment-intents',
  cardsArchive: '/archive-cards',
  connections: '/settings/connections',
  connectionDetails: '/settings/connections/details',
  joinWorkspaces: '/join-workspaces',
  otpLogin: '/otp-login',
  mfaSetup: '/mfa-setup',
  insights: '/payments/insights',
  elements: '/settings/elements',

  /* New registration routes */
  welcomeToBeta: '/welcome-to-beta',
  waitingList: '/waiting-list',
  verifyBetaLink: '/sign-up-beta',
  expiredBetaLink: '/sign-up-beta/expired',
  enterPassword: '/sign-up-beta/password',
  completeSignUp: '/sign-up-beta/complete',

  /* Email Configuration */
  newEmail: '/new-email-template',
  connectionsDirectory: process.env.REACT_APP_CONNECTIONS_URL,

  /* Flows */
  flows: '/flows',
  flowDetails: '/flows/:id/details',
  flowSettings: '/flows/:id/details/settings',
  flowSettingsPaymentProcessor: '/flows/:id/details/settings/payment-processors',
  flowSettingsCheckout: '/flows/:id/details/settings/checkout',
  flowAutomations: '/flows/:id/details/automations',

  /* Automation */
  automations: '/automations',
  automationsPaymentProcessors: '/automations/payment-processors',
  automationTemplates: '/automations/templates/:templateId',
  automationsEditor: '/automations/:id/editor',
  automationsTemplatesBasic: '/automations/templates',
  automationsDirectory: '/automations/recipes',
  automationsTest: '/automations/:id/test',
  automationsMonitor: '/automations/:id/monitor',

  /**COMMUNITY */
  whenthenCommunity: 'https://swegr7b6gsn.typeform.com/to/t9khGJnC',

  version: '/VERSION',

  /*CDN*/
  countriesIcons: 'https://static.whenthen.com/images/countries',
};

const SITE_MAP = [
  {
    title: 'getting started',
    path: '/getting-started',
    subRoutes: [{ title: 'Getting started', path: '', exact: true }],
    permission: GETTING_STARTED_PERMISSIONS_IDS.gettingStarted,
    features: {
      [ROUTE_FEATURE_KEYS.completedGettingStarted]: {
        expectedValue: false, //show when value is false
      },
    },
  },
  {
    title: 'automations',
    path: '/automations',
    subRoutes: [
      {
        title: 'Overview',
        path: '',
        exact: true,
        isActive: (match, location) => {
          if (match) return true;

          return Boolean(matchPath(location?.pathname, ['/automations/payment-processors']));
        },
      },
      {
        title: 'Recipe Directory',
        path: '/recipes',
        exact: true,
      },
    ],
    features: {
      [FEATURE_TOGGLES_KEYS.MULTIPLE_FLOW]: {
        expectedValue: false,
      },
    },
    permission: AUTOMATION_PERMISSIONS_IDS.automations,
  },
  {
    title: 'flows',
    path: '/flows',
    subRoutes: [
      { title: 'All', path: '', exact: true },
      { title: 'Published', path: '/published' },
      { title: 'Unpublished', path: '/unpublished' },
    ],
    features: {
      [FEATURE_TOGGLES_KEYS.MULTIPLE_FLOW]: {
        expectedValue: true,
      },
    },
  },
  {
    title: 'insights',
    path: '/insights',
    subRoutes: [
      { title: 'Overview', path: '', exact: true },
      { title: 'Intents', path: '/intents', exact: true },
      { title: 'Successful', path: '/successful', exact: true },
      { title: 'Canceled', path: '/canceled', exact: true },
      { title: 'Declined', path: '/declined', exact: true },
      { title: 'Disputes', path: '/disputed', exact: true },
      { title: 'Refunded', path: '/refunded', exact: true },
      { title: 'Failed', path: '/failed', exact: true },
    ],
    persistSearch: true,
    features: {
      [FEATURE_TOGGLES_KEYS.INSIGHTS_NAV]: {
        expectedValue: true,
      },
    },
  },
  {
    title: 'payments',
    path: '/payments',
    subRoutes: [
      {
        title: 'All',
        path: '',
        exact: true,
        /**
         * @param {object|null} match
         * @param {{ pathname: string }} location
         *
         * @return {boolean}
         * */
        isActive: (match, location) => {
          if (match) return true;

          return Boolean(
            matchPath(location?.pathname, [
              '/payments/details/:id',
              '/payments/grouped/details/:id',
              '/payments/grouped',
            ])
          );
        },
      },
      {
        title: 'Issues',
        path: '/payment-issues',
        permission: PAYMENTS_PERMISSIONS_IDS.paymentsManagement,
      },
      {
        title: 'Insights',
        path: '/insights',
        features: {
          [FEATURE_TOGGLES_KEYS.INSIGHTS_NAV]: {
            expectedValue: false, // show when value is false
          },
        },
      },
    ],
  },
  {
    title: 'data tables',
    path: '/data-tables',
    isActive: (match, location) => {
      if (match) return true;

      return Boolean(matchPath(location?.pathname, ['/data-tables/:page']));
    },
    subRoutes: [
      { title: 'Customers', path: '/customers' },
      { title: 'Cards', path: '/cards' },
    ],
  },

  {
    title: 'settings',
    path: '/settings',
    subRoutes: [
      {
        title: 'connections',
        path: '/connections',
        permission: SETTINGS_PERMISSIONS_IDS.connections,
        subRoutes: [
          {
            title: 'Live',
            path: '',
            exact: true,
            isActive: (match, location) => {
              if (match) return true;

              return Boolean(matchPath(location?.pathname, '/connections/details/:id'));
            },
          },
        ],
      },
      { title: 'My Profile', path: '/profile', exact: true },
      {
        title: 'Elements',
        path: '/elements',
        subRoutes: [
          { title: 'Brand center', path: '/brand-center' },
          { title: 'Emails', path: '/emails' },
        ],
        features: {
          [FEATURE_TOGGLES_KEYS.SETTINGS_ELEMENTS_NAV]: {
            expectedValue: true, // show when value is true
          },
        },
      },
      {
        title: 'User Management',
        path: '/directory',
        exact: true,
        permission: SETTINGS_PERMISSIONS_IDS.userManagement,
      },
      { title: 'Developers', path: '/developers', permission: SETTINGS_PERMISSIONS_IDS.developers },
    ],
  },
];

export { SITE_MAP, UI_ROUTES };
