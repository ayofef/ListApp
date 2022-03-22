import { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import isEmpty from 'lodash/isEmpty';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';

import { UI_ROUTES } from '../../constants/routes';
import { GQL_M_VERIFY_BETA_CODE } from '../../utils/queries/public/publicMutations';
import { useRegistrationSearchParams, useRegistrationStorage } from '../../hooks/registration';
import { findErrorByCode, getFirstErrorMessage } from '../../utils/graphql';
import { TOAST_TIMEOUT, TOAST_UNEXPECTED_ERROR_MESSAGE } from '../../constants/toasts';
import { REG_METHOD, ONBOARDING_STATUS } from '../../constants/registration';

const TOAST_TITLE = 'Verify Beta Link';
const BETA_CODE_NOT_FOUND_ERROR_TOAST_MESSAGE = 'The link is not found';

const VERIFY_BETA_CODE_ERROR_CODE = {
  notFound: 'error.customer.betacode.confirmation.notfound',
  expired: 'error.customer.betacode.confirmation.expired',
};

const useVerifyBetaLink = () => {
  const { t } = useTranslation();
  const { betaAccessToken, emailAddress, registrationMethod } = useRegistrationSearchParams();
  const [, setRegistrationSession, clearRegistrationStorage] = useRegistrationStorage();
  const { replace, push, location } = useHistory();
  const [checkBetaCode, { called, loading }] = useMutation(GQL_M_VERIFY_BETA_CODE, {
    context: { skipGlobalHandling: true },
  });

  const handleCheckBetaCode = useCallback(async () => {
    try {
      const { data, errors } = await checkBetaCode({
        variables: {
          emailAddress,
          betaAccessToken,
        },
      });

      const isFailed = !isEmpty(errors) || !data?.checkBetaCode;

      if (isFailed) {
        const isNotFound = findErrorByCode(errors, VERIFY_BETA_CODE_ERROR_CODE.notFound);
        const isExpired = findErrorByCode(errors, VERIFY_BETA_CODE_ERROR_CODE.expired);

        if (isNotFound) {
          NotificationManager.error(t(BETA_CODE_NOT_FOUND_ERROR_TOAST_MESSAGE), t(TOAST_TITLE), TOAST_TIMEOUT);
          push(UI_ROUTES.signUp);
          return;
        }

        if (!isExpired) {
          const errorMessage = getFirstErrorMessage(errors) || TOAST_UNEXPECTED_ERROR_MESSAGE;
          NotificationManager.error(t(errorMessage), TOAST_TITLE, TOAST_TIMEOUT);
        }

        push(UI_ROUTES.expiredBetaLink);
        return;
      }

      setRegistrationSession({
        betaAccessToken: betaAccessToken,
        onboardingStatus: ONBOARDING_STATUS.completeRegistration,
      });

      switch (registrationMethod) {
        case REG_METHOD.email:
          push(`${UI_ROUTES.enterPassword}${location?.search || ''}`);
          break;
        case REG_METHOD.google:
          push(`${UI_ROUTES.completeSignUp}${location?.search || ''}`);
          break;
        default:
          push(UI_ROUTES.signIn);
          break;
      }
    } catch (error) {
      NotificationManager.error(t(TOAST_UNEXPECTED_ERROR_MESSAGE), t(TOAST_TITLE), TOAST_TIMEOUT);
      push(UI_ROUTES.expiredBetaLink);
    }
  }, [
    betaAccessToken,
    emailAddress,
    registrationMethod,
    location?.search,
    setRegistrationSession,
    checkBetaCode,
    push,
    t,
  ]);

  useEffect(() => {
    const isMissingRequiredParam = [betaAccessToken, emailAddress, registrationMethod].some(isEmpty);
    if (isMissingRequiredParam) {
      replace(UI_ROUTES.signIn);
      return;
    }

    if (!called) {
      clearRegistrationStorage();
      handleCheckBetaCode();
    }
  }, [
    replace,
    called,
    handleCheckBetaCode,
    clearRegistrationStorage,
    betaAccessToken,
    emailAddress,
    registrationMethod,
  ]);

  return { loading };
};

export { useVerifyBetaLink };
