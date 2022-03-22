import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UI_ROUTES } from '../../constants/routes';
import { ROUTE_BY_ONBOARDING_STATUS_MAP, ONBOARDING_STATUS } from '../../constants/registration';
import { useRegistrationStorage } from './useRegistrationStorage';

const PATH_REQUIRES_ONBOARDING_STATUS = [
  ROUTE_BY_ONBOARDING_STATUS_MAP[ONBOARDING_STATUS.companyDetails],
  ROUTE_BY_ONBOARDING_STATUS_MAP[ONBOARDING_STATUS.welcomeToBeta],
  ROUTE_BY_ONBOARDING_STATUS_MAP[ONBOARDING_STATUS.thanksForInterest],
];

const useHandleRegistrationFlowRedirect = () => {
  const {
    replace,
    location: { pathname },
  } = useHistory();
  const [redirected, setRedirected] = useState(false);
  const [registrationStatus] = useRegistrationStorage();

  useEffect(() => {
    if (!registrationStatus?.onboardingStatus && PATH_REQUIRES_ONBOARDING_STATUS.includes(pathname)) {
      setRedirected(true);
      replace(UI_ROUTES.signIn);
      return;
    }

    if (!registrationStatus?.onboardingStatus) return;

    const newPathname = ROUTE_BY_ONBOARDING_STATUS_MAP[registrationStatus.onboardingStatus];

    if (!newPathname || newPathname === pathname) return;

    setRedirected(true);
    replace(newPathname);
  }, [registrationStatus?.onboardingStatus, replace, pathname]);

  return { redirected };
};

export { useHandleRegistrationFlowRedirect };
