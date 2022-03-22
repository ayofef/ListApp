import React, { useCallback } from 'react';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';

import {
  initialValues,
  signUpFields,
  COMPANY_ROLE_OPTIONS,
  signUpFieldsNames,
} from '../../../utils/schemas/signUpSchema';
import signUpValidator from '../../../utils/validators/signUpValidator';

import Input from '../_common/Input';
import SubmitButton from '../_common/SubmitButton';
import CustomSelect from '../SignUpCompanyDetailsForm/CustomSelect';
import { ONBOARDING_STATUS } from '../../../constants/registration';
import { UI_ROUTES } from '../../../constants/routes';
import { useRegistrationStorage } from '../../../hooks/registration';

const CUSTOM_SELECT_PROPS = {
  options: COMPANY_ROLE_OPTIONS,
  errorProps: {
    margin: '-6px 0 14px 0',
  },
};

const SignUpPersonalDetailsForm = () => {
  const { t } = useTranslation();
  const [registrationSession, setRegistrationSession] = useRegistrationStorage();
  const { push } = useHistory();

  const handleSubmit = useCallback(
    (values) => {
      setRegistrationSession({
        ...registrationSession,
        [ONBOARDING_STATUS.personalDetails]: values,
        onboardingStatus: ONBOARDING_STATUS.companyDetails,
      });
      push(UI_ROUTES.signUpCompanyDetails);
    },
    [setRegistrationSession, registrationSession, push]
  );

  const parsedInitialValues = {
    ...initialValues,
    ...(registrationSession?.[ONBOARDING_STATUS.personalDetails] ?? {}),
  };

  return (
    <Formik
      initialValues={parsedInitialValues}
      onSubmit={handleSubmit}
      validate={signUpValidator}
      validateOnBlur={true}
      validateOnMount={false}
    >
      <Form>
        {signUpFields.map(({ field, type, label }) => {
          const isSelect = signUpFieldsNames.companyRole === field;
          const Component = isSelect ? CustomSelect : Input;

          return (
            <Component
              key={field}
              name={field}
              type={type}
              label={t(label)}
              {...(!isSelect && {
                customLabel: true,
              })}
              {...(isSelect && {
                placeholder: t('Select'),
                ...CUSTOM_SELECT_PROPS,
              })}
            />
          );
        })}

        <Box mt="14px">
          <SubmitButton>{t('common.continueText')}</SubmitButton>
        </Box>
      </Form>
    </Formik>
  );
};

export default SignUpPersonalDetailsForm;
