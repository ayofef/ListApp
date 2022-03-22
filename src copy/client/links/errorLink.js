import { onError } from '@apollo/client/link/error';
import { NotificationManager } from 'react-notifications';
import isEmpty from 'lodash/isEmpty';
import { fromPromise } from '@apollo/client';
import { ERROR_CODES } from '../../constants/api';
import { getStorageValue as isDemoUser } from './demoLink/storage';
import { checkIfMessageExist } from '../../hooks/useNotificationManager';
import { localStorageService } from '../../utils/localStorageService';
import { STORAGE_KEYS } from '../../constants/storage';
import { REFRESH_TOKEN } from '../../utils/queries/public/publicMutations';
import { IGNORE_DEMO_HEADER } from './demoLink/constants';
import { logOut } from '../utils';

const messages = {
  [ERROR_CODES.spendRequestNotDeleted]: 'Spend request not deleted',
  [ERROR_CODES.userRefreshTokenExpired]: 'Please login to whenthen',
  [ERROR_CODES.fundingSourceError]: 'Card is failed to save',
  [ERROR_CODES.duplicatedUser]: 'This email is already in use.',
  [ERROR_CODES.invalidSignUp]: 'This email is already in use. Try signing in or using forgot password',
  [ERROR_CODES.passwordMatch]: 'Your current password does not match. Your password has not been changed.',
  [ERROR_CODES.forgotPasswordNotFound]:
    'Oops, we couldn’t find your reset password token. Please click forgot password again to generate a new one',
  [ERROR_CODES.stripeIssuingMissing]: 'Account does not have Issuing approved',
  [ERROR_CODES.stripeTopUpFailed]: 'Test top up on account failed',
  [ERROR_CODES.stripeWebhookFailed]: 'Will need to set up the webhook at Stripe manually',
  [ERROR_CODES.invalidEmail]: 'Email is invalid',
  [ERROR_CODES.invalidUsernamePassword]: 'Oops - Your email or password is incorrect',
  [ERROR_CODES.loginBlocked]: "We've sent you an email with instructions on how to unblock it.",
  [ERROR_CODES.plaidCurrencyUnsupported]:
    'Oops, we only support Euro accounts at the moment. We are working hard to support multiple currencies.',
  [ERROR_CODES.demoApiDisabled]: 'Use your real account to try out this feature',
  [ERROR_CODES.invalidGrant]: 'The provided code is invalid. Please try again or contact support.',
  [ERROR_CODES.expiredToken]: 'The OTP code is expired. Please try another code',
  [ERROR_CODES.badGateway]: 'The phone number is invalid',
  [ERROR_CODES.paymentFlowMissing]: 'Payment flow is missing',
  [ERROR_CODES.instructMissing]: 'Instruct automation is missing',
};

const DEMO_ERROR_TITLE = 'This is a demo account';

const createRemoveErrorFromResponse = (code) => ({
  [code]: ({ response, operation }) => {
    // eslint-disable-next-line no-console
    console.log(
      `%cerror with "${code}" is removed from operation "${operation.operationName}"`,
      'padding:.25rem;border-radius:.25rem;color:white;background-color:red;'
    );
    if (!response?.errors) {
      return;
    }
    response.errors = response.errors.filter((error) => error?.extensions?.code !== code);
  },
});

const handlers = {
  ...createRemoveErrorFromResponse(ERROR_CODES.userUnauthenticated),
};

const showDemoApiError = () => {
  if (!checkIfMessageExist()) {
    NotificationManager.error(messages[ERROR_CODES.demoApiDisabled], DEMO_ERROR_TITLE, 5000);
  }
};

/*
 * IMPORTANT NOTE ABOUT ERROR HANDLING!!!
 * if you need to catch an error locally in component you should add
 * context: {skipGlobalHandling: true}
 * to useQuery or useMutation
 *
 * to check if the query went well locally in component it's enough to check
 * if data returned back
 * */

const showNotification = (message, duration = 5000) => {
  if (NotificationManager.listNotify.length !== 0) {
    return;
  }
  NotificationManager.error(message, 'Oops..', duration);
};

const logOutAndRedirect = () => {
  logOut();
  document.location.href = '/signIn';
};

let isRefreshing = false;
let pendingRequests = [];

const setIsRefreshing = (value) => {
  isRefreshing = value;
};

const addPendingRequest = (pendingRequest) => {
  pendingRequests.push(pendingRequest);
};

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback());
  pendingRequests = [];
};

const ErrorLink = () => {
  let clientRef;
  const errorLink = onError((errorResponse) => {
    const { graphQLErrors, networkError, operation, response, forward } = errorResponse;
    const { skipGlobalHandling } = operation.getContext();
    const responseHeaders = operation.getContext().response.headers;
    const oldHeaders = operation.getContext().headers;

    if (skipGlobalHandling) {
      return;
    }

    if (isDemoUser() && graphQLErrors) {
      showDemoApiError();
      return;
    }

    let message;

    if (networkError) {
      message = 'Connection problem';
      showNotification(message);
    }

    if (graphQLErrors) {
      graphQLErrors.forEach((graphQLError) => {
        const code = graphQLError?.extensions?.code;
        const handler = handlers[code];
        if (handler) {
          handler(errorResponse);
          return;
        }
        message = messages[code];
        if (message) {
          showNotification(message);
        }
      });
    }

    if (response) {
      response.errors = undefined;
    }

    if (responseHeaders?.get('X-Auth-Expired') === 'true') {
      if (!isRefreshing) {
        setIsRefreshing(true);
        const refreshToken = localStorageService.getItem(STORAGE_KEYS.refreshToken);
        if (refreshToken === null) {
          logOutAndRedirect();
          return;
        }
        // eslint-disable-next-line consistent-return
        return fromPromise(
          clientRef
            .mutate({
              mutation: REFRESH_TOKEN,
              variables: { refreshToken },
              context: { [IGNORE_DEMO_HEADER]: true, skipGlobalHandling: true },
            })
            .then((result) => {
              const responseRefreshToken = result?.data?.refreshToken;
              const newToken = responseRefreshToken?.token;
              const newRefreshToken = responseRefreshToken?.refreshToken;
              const currency = responseRefreshToken?.customer?.currency;
              if (isEmpty(newToken) || isEmpty(newRefreshToken)) {
                logOutAndRedirect();
                return;
              }
              localStorageService.setItem(STORAGE_KEYS.confirmDetails, !isEmpty(currency));
              localStorageService.setItem(STORAGE_KEYS.token, newToken);
              localStorageService.setItem(STORAGE_KEYS.refreshToken, newRefreshToken);
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${newToken}`,
                },
              });
            })
            .catch(() => {
              resolvePendingRequests();
              setIsRefreshing(false);
              logOutAndRedirect();
            })
        ).flatMap(() => {
          resolvePendingRequests();
          setIsRefreshing(false);
          return forward(operation);
        });
      }
      // eslint-disable-next-line consistent-return
      return fromPromise(
        new Promise((resolve) => {
          addPendingRequest(() => resolve());
        })
      ).flatMap(() => forward(operation));
    }
  });

  const setClient = (client) => {
    clientRef = client;
  };

  return {
    errorLink,
    setClient,
  };
};

export { messages };
export default ErrorLink;
