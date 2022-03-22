import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import { useHistory } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { TOAST_TIMEOUT, TOAST_UNEXPECTED_ERROR_MESSAGE } from '../../constants/toasts';
import useMutationSetTokens from '../../hooks/useMutationSetTokens';
import { LOGIN_WITH_GOOGLE } from '../../utils/queries/public/publicMutations';
import { MUTATION_NAMES } from '../../constants/api';
import { useGoogleOAuth, GOOGLE_AUTH_TYPE } from '../../hooks/useGoogleOAuth';
import { useNotificationManager } from '../../hooks/useNotificationManager';
import { UI_ROUTES } from '../../constants/routes';
import { getFirstErrorMessage } from '../../utils/graphql';
import { ON_BOARDING_HANDLERS } from '../../hooks/useGetMe';

const TITLE = 'Sign in';
const NOT_REGISTERED_ERROR = 'Account does not exist, Sign up.';

export const useSignInWithGoogleCallback = () => {
  const { t } = useTranslation();
  const {
    push,
    location: { pathname },
  } = useHistory();

  const [authorize, { error: authorizeError, loading }] = useMutationSetTokens(
    LOGIN_WITH_GOOGLE,
    MUTATION_NAMES[GOOGLE_AUTH_TYPE.login]
  );

  const { authenticationState, error: oauthError } = useGoogleOAuth();

  const error = authorizeError?.message || oauthError;

  useNotificationManager('error', t(error), t(TITLE), TOAST_TIMEOUT);

  const handleError = useCallback(
    (message) => {
      NotificationManager.error(t(message), t(TITLE), TOAST_TIMEOUT);
    },
    [t]
  );

  const handleAuthorizeWithGoogle = useCallback(
    async (email, googleToken) => {
      try {
        const { data, errors } = await authorize({
          variables: {
            username: email,
            googleToken,
          },
        });

        const isFailed = !isEmpty(errors) || !data?.login;

        if (isFailed) {
          const errorMessage = getFirstErrorMessage(errors) || TOAST_UNEXPECTED_ERROR_MESSAGE;
          handleError(errorMessage);
          return;
        }

        const isRegistered = !!data?.login?.customer?.id && !!data?.login?.isLoggedIn;

        if (!isRegistered) {
          handleError(NOT_REGISTERED_ERROR);
          push(UI_ROUTES.signUp);
          return;
        }

        /**
         * Restricted routes are mapped against status returned from the backend
         * User will get a blank screen if there is a mismatch with the screen show and the status returned from BE  */

        const loginStatus = data.login.status;
        const newPathName = ON_BOARDING_HANDLERS[loginStatus]?.(pathname) || UI_ROUTES.home;
        push(newPathName);
      } catch {
        handleError(TOAST_UNEXPECTED_ERROR_MESSAGE);
      }
    },
    [authorize, push, handleError, pathname]
  );

  useEffect(() => {
    if (authenticationState?.state !== GOOGLE_AUTH_TYPE.login) {
      return;
    }

    handleAuthorizeWithGoogle(authenticationState.jwt.email, authenticationState.token);
  }, [authenticationState, handleAuthorizeWithGoogle]);

  return { loading };
};
