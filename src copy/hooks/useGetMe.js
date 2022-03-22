import { useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { GET_ME_AND_WE } from '../utils/queries/public/publicQueries';
import { UI_ROUTES } from '../constants/routes';
import { ERROR_CODES } from '../constants/api';
import { ONBOARDING_STATUS } from '../constants/registration';

const ON_BOARDING_ROUTES = [
  UI_ROUTES.slackAuth,
  UI_ROUTES.signUp,
  UI_ROUTES.signUpPersonalDetails,
  UI_ROUTES.signIn,
  UI_ROUTES.signUpCompanyDetails,
  UI_ROUTES.otpLogin,
  UI_ROUTES.mfaSetup,
  UI_ROUTES.emailConfirmation,
  UI_ROUTES.joinWorkspaces,
  UI_ROUTES.planSelection,
  UI_ROUTES.signUpSurvey,
  UI_ROUTES.betaAccessCode,
  //NEW REG ROUTES
  UI_ROUTES.welcomeToBeta,
  UI_ROUTES.waitingList,
  UI_ROUTES.verifyBetaLink,
];

const AUTH_ERRORS = [ERROR_CODES.confirmationNotFound];

const ON_BOARDING_HANDLERS = {
  // TODO: Investigate following bug
  // Do not touch confirm account pathname handling, it will cause bug related to onboardingStatus received from apollo cache
  CONFIRM_ACCOUNT: (pathname) =>
    pathname !== UI_ROUTES.mfaSetup && pathname !== UI_ROUTES.otpLogin && UI_ROUTES.emailConfirmation,
  SETUP_MFA: () => UI_ROUTES.mfaSetup,

  VERIFY_MFA: () => UI_ROUTES.mfaSetup,
  COMPANY_DETAILS: (pathname) =>
    pathname === UI_ROUTES.verifyBetaLink ? UI_ROUTES.verifyBetaLink : UI_ROUTES.signUpCompanyDetails,

  SELECT_WORKSPACE: (pathname) => pathname !== UI_ROUTES.signUpCompanyDetails && UI_ROUTES.joinWorkspaces,
  MFA_SUBMIT_CHALLENGE: () => UI_ROUTES.otpLogin,
  MFA_CHALLENGE: () => UI_ROUTES.otpLogin,
  SELECT_PLAN: () => UI_ROUTES.planSelection,
  CONFIRM_BETA_CODE: () => UI_ROUTES.betaAccessCode,
  SIGNUP_REASONS: () => UI_ROUTES.signUpSurvey,
  COMPLETE: (pathname) => ON_BOARDING_ROUTES.includes(pathname) && UI_ROUTES.home,

  //NEW REG ROUTES
  [ONBOARDING_STATUS.welcomeToBeta]: () => UI_ROUTES.welcomeToBeta,
  [ONBOARDING_STATUS.waitingList]: () => UI_ROUTES.waitingList,
};

const checkIsRole = (data) => (role) => {
  if (!data) {
    return false;
  }

  return data.me?.role === role;
};

const useGetMe = (isLogin) => {
  const history = useHistory();

  const { data: _data, error, loading, refetch, startPolling, stopPolling } = useQuery(GET_ME_AND_WE, {
    skip: !isLogin,
  });

  /* replace data.getOnboardingStatus on development from 'SELECT_PLAN' to 'COMPLETE' */
  const data = useMemo(() => {
    if (process.env.NODE_ENV !== 'development' || _data?.getOnboardingStatus !== 'SELECT_PLAN') return _data;

    return { ..._data, getOnboardingStatus: 'COMPLETE' };
  }, [_data]);

  const onboardingStatus = data?.getOnboardingStatus;

  const isRoleFn = useMemo(() => checkIsRole(_data), [_data]);
  const isAdmin = isRoleFn('ADMIN');
  const isOwner = isRoleFn('OWNER');

  /* stop polling */
  useEffect(() => {
    const {
      location: { pathname },
    } = history;

    if (loading || !onboardingStatus || pathname === UI_ROUTES.emailConfirmation) return;

    stopPolling();
  }, [loading, onboardingStatus, history, stopPolling]);
  /* handle on boarding status */
  useEffect(() => {
    const {
      location: { pathname },
    } = history;

    if (loading || !onboardingStatus) return;

    const newPathname = ON_BOARDING_HANDLERS[onboardingStatus]?.(pathname);

    if (newPathname && newPathname !== pathname) {
      history.push(newPathname);
    }
  }, [loading, onboardingStatus, history]);

  /* handle errors */
  useEffect(() => {
    const code = error?.graphQLErrors?.[0]?.extensions?.code;

    if (loading || onboardingStatus || !AUTH_ERRORS.includes(code)) return;

    history.push(UI_ROUTES.signIn);
  }, [loading, onboardingStatus, error, history]);

  return {
    data,
    error,
    loading,
    isOwner,
    isAdmin,
    refetch,
    startPolling,
    stopPolling,
  };
};

export { useGetMe, ON_BOARDING_HANDLERS };
