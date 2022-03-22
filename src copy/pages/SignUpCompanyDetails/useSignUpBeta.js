import { useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import { useHistory } from 'react-router-dom';

import { GQL_M_SIGN_UP_BETA } from '../../utils/queries/public/publicMutations';
import { ONBOARDING_STATUS } from '../../constants/registration';
import { checkIsMeetCriteria, transformSignUpBetaValues } from './constant';
import { UI_ROUTES } from '../../constants/routes';
import { initialValues } from '../../utils/schemas/confirmDetailsSchema';
import { isDefined } from '../../utils/helpers';
import { useHandleRegistrationFlowRedirect, useRegistrationStorage } from '../../hooks/registration';
import { messages } from '../../client/links/errorLink';
import { TOAST_TIMEOUT, TOAST_UNEXPECTED_ERROR_MESSAGE } from '../../constants/toasts';
import { ERROR_CODES } from '../../constants/api';
import { findErrorByCode, getFirstErrorMessage } from '../../utils/graphql';

const TOAST_TITLE = 'Sign Up';
const MUTATION_OPTION = { context: { skipGlobalHandling: true } };

//TOD: CHeck exception to avoid multiple toast messages
const useSignUpBeta = () => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const [signUpBeta, { loading }] = useMutation(GQL_M_SIGN_UP_BETA, MUTATION_OPTION);
  const [registrationSession, setRegistrationSession] = useRegistrationStorage();
  useHandleRegistrationFlowRedirect();

  const parsedInitialValues = {
    ...initialValues,
    ...(isDefined(registrationSession?.[ONBOARDING_STATUS.companyDetails]) &&
      registrationSession[ONBOARDING_STATUS.companyDetails]),
  };

  const handleSubmit = async (values) => {
    //check if user Meets Criteria
    const userMeetsCriteria = checkIsMeetCriteria(values);

    let latestValues = {
      ...registrationSession,
      [ONBOARDING_STATUS.companyDetails]: values,
      onboardingStatus: userMeetsCriteria ? ONBOARDING_STATUS.welcomeToBeta : ONBOARDING_STATUS.thanksForInterest,
    };

    try {
      //Returns Boolean
      const res = await signUpBeta({
        variables: { ...transformSignUpBetaValues(latestValues, userMeetsCriteria) },
      });

      //Error handling
      const isFailed = !isEmpty(res?.errors) || !res?.data?.signUpBeta;

      if (isFailed) {
        const error = getFirstErrorMessage(res?.errors);
        const errorMessage = messages[error] ?? error ?? TOAST_UNEXPECTED_ERROR_MESSAGE;

        NotificationManager.error(t(errorMessage), t(TOAST_TITLE), TOAST_TIMEOUT);

        const isDuplicatedUser = !!findErrorByCode(res?.errors, ERROR_CODES.duplicatedUser);

        if (isDuplicatedUser) {
          latestValues = {
            ...latestValues,
            onboardingStatus: ONBOARDING_STATUS.personalDetails,
          };
          setRegistrationSession(latestValues);

          push(UI_ROUTES.signUpPersonalDetails);
        }

        return;
      }

      //Success handling
      setRegistrationSession(latestValues);

      //Redirect user to the right page
      if (userMeetsCriteria) {
        push(UI_ROUTES.welcomeToBeta);
        return;
      }

      push(UI_ROUTES.waitingList);
    } catch {
      NotificationManager.error(t(TOAST_UNEXPECTED_ERROR_MESSAGE), t(TOAST_TITLE), TOAST_TIMEOUT);
    }
  };

  return { signUpBeta: handleSubmit, parsedInitialValues, loading };
};

export { useSignUpBeta };
