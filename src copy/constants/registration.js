import { UI_ROUTES } from './routes';

export const REG_SESSION_STORAGE_KEY = 'wt-registration';
export const GOOGLE_EMAIL_SWITCHER_PARAM_KEY = 'signUpState';

export const ONBOARDING_STATUS = {
  personalDetails: 'PERSONAL_DETAILS',
  companyDetails: 'COMPANY_DETAILS',
  welcomeToBeta: 'WELCOME_TO_BETA',
  thanksForInterest: 'THANKS_FOR_INTEREST',
  completeRegistration: 'COMPLETE_REGISTRATION',
  completeInvitation: 'COMPLETE_INVITATION',
};

export const ROUTE_BY_ONBOARDING_STATUS_MAP = {
  [ONBOARDING_STATUS.personalDetails]: UI_ROUTES.signUpPersonalDetails,
  [ONBOARDING_STATUS.companyDetails]: UI_ROUTES.signUpCompanyDetails,
  [ONBOARDING_STATUS.welcomeToBeta]: UI_ROUTES.welcomeToBeta,
  [ONBOARDING_STATUS.thanksForInterest]: UI_ROUTES.thanksForInterest,
};

export const REG_METHOD = {
  email: 'email',
  google: 'google',
  googleEmail: 'google-email', // FE only -  signed up with email but completing registration with password
};

export const SIGN_UP_REG_METHOD_MAP = {
  [REG_METHOD.email]: 'EMAIL',
  [REG_METHOD.google]: 'GOOGLE',
};

// TODO: Update BE to use the same registration methods both for SignUp and CompleteSignUp
export const COMPLETE_SIGN_UP_REG_METHOD_MAP = {
  [REG_METHOD.email]: 'email',
  [REG_METHOD.google]: 'google',
  [REG_METHOD.googleEmail]: 'google-email', // FE only -  signed up with email but completing registration with password
};
