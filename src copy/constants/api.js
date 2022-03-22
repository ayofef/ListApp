export const APP_VERSION = process.env.REACT_APP_VERSION;
export const APP_NAME = process.env.REACT_APP_NAME;
export const API_URL = process.env.REACT_APP_API_URL;
export const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;
export const SENTRY_ENV = process.env.REACT_APP_SENTRY_ENV;
// export const SENTRY_APP = process.env.REACT_APP_SENTRY_APP;
// export const PLAID_PUBLIC = process.env.REACT_APP_PLAID_PUBLIC;
// export const PLAID_ENV = process.env.REACT_APP_PLAID_ENV;
// export const PLAID_WEBHOOK = process.env.REACT_APP_PLAID_WEBHOOK;
export const LANDING_URL = process.env.REACT_APP_LANDING_URL;
export const GTM_ID = process.env.REACT_APP_GTM_ID;

export const LOGIN_TYPES = {
  externalAuth: 'EXTERNAL_OAUTH',
};

export const EXTERNAL_OAUTH_TYPES = {
  slack: 'slack',
};

export const MUTATION_NAMES = {
  signUp: 'signup',
  login: 'login',
  completeInvitation: 'completeInvitation',
};

export const ERROR_CODES = {
  emailUnconfirmed: 'user.unconfirmed',
  userUnauthenticated: 'user.unauthenticated',
  invalidSignUp: 'invalid_signup',
  invalidEmail: 'user.invalid-email',
  invalidUsernamePassword: 'error.invalid.login',
  duplicatedUser: 'user.duplicate',
  customerAuth: 'customer.unauthenticated',
  invitationNotFound: 'error.user.invite.notfound',
  invitationExpired: 'error.user.invite.expired',
  confirmationNotFound: 'error.user.confirmation.notfound',
  passwordMatch: 'customer.password.currentPassword.match',
  forgotPasswordNotFound: 'error.user.forgotpassword.notfound',
  stripeIssuingMissing: 'stripe.issuing.missing',
  stripeTopUpFailed: 'stripe.topup.failed',
  stripeWebhookFailed: 'stripe.webhook.failed ',
  receiptReminderAlreadySent: 'receipt.reminder.already.sent',
  plaidCurrencyUnsupported: 'plaid.currency.unsupported',
  fundingSourceError: 'funding-source.error',
  userRefreshTokenExpired: 'user.refreshToken.expired',
  customerCurrencyUnsupported: 'customer.currency.unsupported',
  spendRequestNotDeleted: 'spend.request.not.deleted',
  loginBlocked: 'too_many_attempts',
  demoApiDisabled: 'demo.api.disabled',
  invalidGrant: 'invalid_grant',
  expiredToken: 'expired_token',
  badGateway: 'bad_gateway',
  paymentFlowMissing: 'payment.flow.missing',
  instructMissing: 'instruct.flow.missing',
};

export const APP_ID = 'spend-request';
