import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { TOAST_TIMEOUT } from '../../constants/toasts';
import { useGoogleOAuth, GOOGLE_AUTH_TYPE } from '../../hooks/useGoogleOAuth';
import { useNotificationManager } from '../../hooks/useNotificationManager';
import { UI_ROUTES } from '../../constants/routes';
import { useRegistrationStorage } from '../../hooks/registration';
import { REG_METHOD } from '../../constants/registration';
import { useCompleteBetaSignUp } from '../../hooks/registration/useCompleteBetaSignUp';

const TITLE = 'Sign in';
const BETA_CODE_SUCCESS_TITLE = 'Verify Beta Code';
const BETA_CODE_SUCCESS_MESSAGE = 'Beta registration is completed';

export const useCompleteGoogleSignUpCallback = () => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const [registrationSession] = useRegistrationStorage();
  const { authenticationState, error: oauthError } = useGoogleOAuth();

  const {
    completeBetaSignUpAndLogin,

    loading,
    error: completeBetaSignUpError,
    betaSignUpCompleted,
  } = useCompleteBetaSignUp({
    email: authenticationState?.jwt?.email,
    registrationMethod: REG_METHOD.google,
    betaAccessToken: registrationSession?.betaAccessToken,
  });

  const error = oauthError || completeBetaSignUpError;

  useNotificationManager('error', t(error), t(TITLE), TOAST_TIMEOUT);

  const handleCompleteSignUpWithGoogle = useCallback(
    (googleToken) => {
      completeBetaSignUpAndLogin(googleToken);
    },
    [completeBetaSignUpAndLogin]
  );

  useEffect(() => {
    if (betaSignUpCompleted) {
      NotificationManager.success(t(BETA_CODE_SUCCESS_MESSAGE), t(BETA_CODE_SUCCESS_TITLE), TOAST_TIMEOUT);
    }
  }, [betaSignUpCompleted, t]);

  useEffect(() => {
    if (authenticationState?.state !== GOOGLE_AUTH_TYPE.completeSignUp) {
      return;
    }

    handleCompleteSignUpWithGoogle(authenticationState.token);
  }, [authenticationState, handleCompleteSignUpWithGoogle]);

  useEffect(() => {
    if (authenticationState && completeBetaSignUpError) {
      push(UI_ROUTES.completeSignUp);
    }
  }, [authenticationState, completeBetaSignUpError, push]);

  return { loading };
};
