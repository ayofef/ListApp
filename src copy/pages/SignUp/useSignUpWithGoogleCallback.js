import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import { useHistory } from 'react-router-dom';
import qs from 'qs';

import { TOAST_TIMEOUT } from '../../constants/toasts';
import { useGoogleOAuth, GOOGLE_AUTH_TYPE } from '../../hooks/useGoogleOAuth';
import { useNotificationManager } from '../../hooks/useNotificationManager';
import { UI_ROUTES } from '../../constants/routes';
import { useRegistrationStorage } from '../../hooks/registration';
import { isFreeMail } from '../../utils/isFreeMail';
import { ONBOARDING_STATUS } from '../../constants/registration';
import { signUpFieldsNames } from '../../utils/schemas/signUpSchema';

const TITLE = 'Sign up';
const FREE_EMAIL_ERROR_MESSAGE = 'Please use your company email.';
export const FREE_EMAIL_ERROR_FLAG = 'free-email';

export const useSignUpWithGoogleCallback = () => {
  const { t } = useTranslation();
  const { push, replace } = useHistory();
  const [completed, setCompleted] = useState(false);
  const [, setRegistrationSession] = useRegistrationStorage();

  const { authenticationState, error } = useGoogleOAuth();

  useNotificationManager('error', t(error), t(TITLE), TOAST_TIMEOUT);

  const handleError = useCallback(
    (message) => {
      NotificationManager.error(t(message), t(TITLE), TOAST_TIMEOUT);
    },
    [t]
  );

  const handleSignUpWithGoogle = useCallback(
    (jwt, googleToken) => {
      const { email, name } = jwt;

      if (isFreeMail(email)) {
        handleError(FREE_EMAIL_ERROR_MESSAGE);
        replace({ pathname: UI_ROUTES.SIGN_UP, search: qs.stringify({ [FREE_EMAIL_ERROR_FLAG]: true }), hash: '' });
        return;
      }

      const newRegistrationSession = {
        [ONBOARDING_STATUS.personalDetails]: {
          [signUpFieldsNames.companyEmail]: email,
          [signUpFieldsNames.name]: name,
        },
        onboardingStatus: ONBOARDING_STATUS.personalDetails,
        googleToken,
      };

      setCompleted(true);
      setRegistrationSession(newRegistrationSession);
      push(UI_ROUTES.signUpPersonalDetails);
    },
    [handleError, push, replace, setRegistrationSession]
  );

  useEffect(() => {
    if (authenticationState?.state !== GOOGLE_AUTH_TYPE.signUp) {
      return;
    }

    handleSignUpWithGoogle(authenticationState.jwt, authenticationState.token);
  }, [authenticationState, handleSignUpWithGoogle]);

  return { completed, error };
};
