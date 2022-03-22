import { confirmDetailsNames } from '../../utils/schemas/confirmDetailsSchema';
import { OTHERS_VALUE } from '../../components/forms/SignUpCompanyDetailsForm/consts';
import { REG_METHOD, ONBOARDING_STATUS, SIGN_UP_REG_METHOD_MAP } from '../../constants/registration';

/**
 *
 * @param {<Object>} data
 * @returns {Boolean}
 *
 * Validation of data is handled by the ConfirmDetailsForm
 */
const checkIsMeetCriteria = (values) => {
  const paymentProcessorValue = values?.[confirmDetailsNames.paymentProcessors];

  const isFailedCriteria = paymentProcessorValue?.length === 1 && paymentProcessorValue?.[0] === OTHERS_VALUE;

  return !isFailedCriteria;
};

/**
 * Validation of values is handled by the ConfirmDetailsForm
 */

const transformSignUpBetaValues = (values, meetsCriteria) => {
  const {
    companyName,
    companySize,
    currency,
    paymentNeeds,
    paymentProcessors,
    paymentNeedsOthers,
    acceptedTC,
    acceptedNewsletter,
    paymentProcessorOthers,
  } = values?.[ONBOARDING_STATUS.companyDetails];
  const { name, companyEmail, companyRole } = values?.[ONBOARDING_STATUS.personalDetails];

  const registrationMethod = values.googleToken ? REG_METHOD.google : REG_METHOD.email;

  return {
    name,
    email: companyEmail,
    companyRole,
    companyName,
    companySize,
    currency,
    paymentNeeds: paymentNeeds[0], //TODO: needs rework from BE
    paymentNeedsOthers,
    paymentProcessors,
    otherPaymentProcessors: paymentProcessorOthers,
    registrationMethod: SIGN_UP_REG_METHOD_MAP[registrationMethod],
    meetsCriteria,
    acceptedTC,
    acceptedNewsletter,
  };
};

export { checkIsMeetCriteria, transformSignUpBetaValues };
