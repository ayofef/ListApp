import useSearch from '../useSearch';
import { REG_METHOD, GOOGLE_EMAIL_SWITCHER_PARAM_KEY } from '../../constants/registration';

/**
 * ...(searchParams?.[GOOGLE_EMAIL_SWITCHER_PARAM_KEY] && { registrationMethod: REG_METHOD.googleEmail }),
 * reference:
 *  useCompleteBetaSignUp.js
 * used to switch to email registration method when user initially signed up with google but switched to email
 *  */

export const useRegistrationSearchParams = () => {
  const [searchParams] = useSearch();

  return {
    betaAccessToken: searchParams?.beta_access_token,
    emailAddress: searchParams?.email_address,
    ...(!searchParams?.[GOOGLE_EMAIL_SWITCHER_PARAM_KEY] && {
      registrationMethod: searchParams?.registration_method?.toLowerCase(),
    }),
    ...(searchParams?.[GOOGLE_EMAIL_SWITCHER_PARAM_KEY] && { registrationMethod: REG_METHOD.googleEmail }),
  };
};
