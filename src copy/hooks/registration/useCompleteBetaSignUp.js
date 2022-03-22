import { useState, useEffect, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import isEmpty from 'lodash/isEmpty';
import { useHistory } from 'react-router-dom';

import {
  DEFAULT_LOGIN,
  GQL_M_COMPLETE_BETA_SIGN_UP,
  LOGIN_WITH_GOOGLE,
} from '../../utils/queries/public/publicMutations';
import { getFirstErrorMessage } from '../../utils/graphql';
import { TOAST_UNEXPECTED_ERROR_MESSAGE } from '../../constants/toasts';
import useMutationSetTokens from '../useMutationSetTokens';
import { MUTATION_NAMES } from '../../constants/api';
import { COMPLETE_SIGN_UP_REG_METHOD_MAP, REG_METHOD } from '../../constants/registration';
import { UI_ROUTES } from '../../constants/routes';

const LOGIN_MUTATION_MAP = {
  [REG_METHOD.email]: DEFAULT_LOGIN,
  [REG_METHOD.google]: LOGIN_WITH_GOOGLE,
  [REG_METHOD.googleEmail]: DEFAULT_LOGIN,
};

export const useCompleteBetaSignUp = ({ email, registrationMethod, betaAccessToken }) => {
  const [error, setError] = useState();
  const [betaSignUpCompleted, setBetaSignUpCompleted] = useState(false);
  const [loginCompleted, setLoginCompleted] = useState(false);
  const { push } = useHistory();

  const [completeBetaSignUp, { loading: completingBeta }] = useMutation(GQL_M_COMPLETE_BETA_SIGN_UP);

  const [login, { loading: loggingIn }] = useMutationSetTokens(
    LOGIN_MUTATION_MAP[registrationMethod],
    MUTATION_NAMES.login
  );

  const loading = completingBeta || loggingIn;
  const completed = betaSignUpCompleted && loginCompleted;

  useEffect(() => {
    setError(undefined);
    setBetaSignUpCompleted(undefined);
    setLoginCompleted(undefined);
  }, [email, registrationMethod, betaAccessToken]);

  const handleResponseErrors = useCallback((response) => {
    const errorMessage = getFirstErrorMessage(response?.errors) || TOAST_UNEXPECTED_ERROR_MESSAGE;
    setError(errorMessage);
  }, []);

  const handleCompleteBetaSignUpAndLogin = useCallback(
    async (passwordOrToken) => {
      if (completed) {
        return;
      }

      setError(undefined);

      if (!betaSignUpCompleted) {
        try {
          let variables = {
            registrationMethod: COMPLETE_SIGN_UP_REG_METHOD_MAP[registrationMethod],
            emailAddress: email,
            betaAccessToken,
          };

          switch (registrationMethod) {
            case REG_METHOD.email:
              variables = { ...variables, password: passwordOrToken };
              break;
            case REG_METHOD.google:
              variables = { ...variables, googleToken: passwordOrToken };
              break;
            case REG_METHOD.googleEmail:
              variables = {
                ...variables,
                registrationMethod: COMPLETE_SIGN_UP_REG_METHOD_MAP[REG_METHOD.email],
                password: passwordOrToken,
              };
              break;
            default:
              throw new Error('Invalid registration method');
          }

          const res = await completeBetaSignUp({
            variables,
          });

          const failed = !isEmpty(res?.errors) || !res?.data?.completeBetaSignUp;

          if (failed) {
            handleResponseErrors(res);
            return;
          }

          setBetaSignUpCompleted(true);
        } catch {
          setError(TOAST_UNEXPECTED_ERROR_MESSAGE);
          return;
        }
      }

      try {
        let variables = {};

        switch (registrationMethod) {
          case REG_METHOD.email:
            variables = { ...variables, email, password: passwordOrToken };
            break;
          case REG_METHOD.google:
            variables = { ...variables, username: email, googleToken: passwordOrToken };
            break;
          case REG_METHOD.googleEmail:
            variables = { ...variables, email, password: passwordOrToken };
            break;
          default:
            throw new Error('Invalid registration method');
        }

        const res = await login({
          variables,
        });

        const failed = !isEmpty(res?.errors) || !res?.data?.login?.isLoggedIn;
        if (failed) {
          handleResponseErrors(res);
          return;
        }
        setLoginCompleted(true);
        /* Note: After login, we call setToken and setRefreshToken -- if the execution is not complete before we redirect to a restricted route, user gets logged out */
        setTimeout(() => {
          push(UI_ROUTES.mfaSetup);
        }, 1000);
      } catch {
        setError(TOAST_UNEXPECTED_ERROR_MESSAGE);
      }
    },
    [
      completed,
      betaSignUpCompleted,
      login,
      completeBetaSignUp,
      handleResponseErrors,
      email,
      registrationMethod,
      betaAccessToken,
      push,
    ]
  );

  return {
    completeBetaSignUpAndLogin: handleCompleteBetaSignUpAndLogin,
    loading,
    betaSignUpCompleted,
    loginCompleted,
    error,
  };
};
