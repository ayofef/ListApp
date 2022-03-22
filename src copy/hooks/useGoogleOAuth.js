import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import { v4 } from 'uuid';
import isEmpty from 'lodash/isEmpty';

import { STRINGIFY_OPTIONS } from './useSearch';
import { useLocalStorageState } from './storage';
import { parseJwt } from '../utils/helpers';
import { UI_ROUTES } from '../constants/routes';

const STORAGE_NONCE_KEY = 'google_nonce';
const GOOGLE_OAUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_OAUTH_PARAMS = {
  response_type: 'token id_token',
  scope: 'openid profile email',
  prompt: 'select_account',
  client_id: process.env.REACT_APP_GOOGLE_AUTH_ID,
};

const GOOGLE_OAUTH_FAILED_MESSAGE = 'Google authentication failed';

export const GOOGLE_AUTH_TYPE = {
  login: 'login',
  signUp: 'signUp',
  completeSignUp: 'completeSignUp',
  completeSignUpWithInvitation: 'completeSignUpWithInvitation',
};

export const ROUTE_BY_GOOGLE_AUTH_TYPE_MAP = {
  [GOOGLE_AUTH_TYPE.login]: UI_ROUTES.signIn,
  [GOOGLE_AUTH_TYPE.signUp]: UI_ROUTES.signUp,
  [GOOGLE_AUTH_TYPE.completeSignUp]: UI_ROUTES.completeSignUp,
  [GOOGLE_AUTH_TYPE.completeSignUpWithInvitation]: UI_ROUTES.invite,
};

const getAuthenticationState = (hash) => {
  if (isEmpty(hash)) {
    return undefined;
  }

  let response;
  try {
    response = qs.parse(hash);
  } catch {
    return undefined;
  }

  if (!response) {
    return undefined;
  }

  const state = response['#state'];
  const token = response.id_token;
  if (isEmpty(state) || isEmpty(token)) {
    return undefined;
  }

  let jwt;
  try {
    jwt = parseJwt(token);
  } catch {
    return undefined;
  }

  if (!jwt) {
    return undefined;
  }

  return {
    token,
    state,
    jwt,
  };
};

export const useGoogleOAuth = () => {
  const { location } = useHistory();
  const [authenticationState, setAuthenticationState] = useState();
  const [error, setError] = useState();
  const [expectedNonce, setExpectedNonce, removeExpectedNonce] = useLocalStorageState(STORAGE_NONCE_KEY);

  useEffect(() => {
    const newAuthenticationState = getAuthenticationState(location?.hash);

    if (!newAuthenticationState || isEmpty(expectedNonce)) {
      setAuthenticationState(undefined);
      setError(undefined);
      return;
    }

    if (expectedNonce !== newAuthenticationState.jwt?.nonce) {
      setAuthenticationState(undefined);
      setError(GOOGLE_OAUTH_FAILED_MESSAGE);
      return;
    }

    setError(undefined);

    if (newAuthenticationState.jwt.nonce === authenticationState?.jwt?.nonce) {
      return;
    }

    setAuthenticationState(newAuthenticationState);
  }, [location, expectedNonce, authenticationState]);

  const handleGoogleAuth = useCallback(
    (state, redirectUri) => {
      const nonce = v4();

      setExpectedNonce(nonce);

      const params = {
        ...GOOGLE_OAUTH_PARAMS,
        state,
        redirect_uri: redirectUri,
        nonce: nonce,
      };

      const stringifiedParams = qs.stringify(params, STRINGIFY_OPTIONS);

      window.open(`${GOOGLE_OAUTH_URL}?${stringifiedParams}`, '_self');
    },
    [setExpectedNonce]
  );

  const resetGoogleAuth = useCallback(() => {
    setAuthenticationState(undefined);
    removeExpectedNonce();
  }, [removeExpectedNonce]);

  return {
    authenticate: handleGoogleAuth,
    authenticationState: authenticationState,
    reset: resetGoogleAuth,
    error,
  };
};
