import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import Box from '@material-ui/core/Box';
import { string } from 'prop-types';
import { NotificationManager } from 'react-notifications';

import {
  enterPasswordFieldNames,
  enterPasswordFields,
  initialValues,
} from '../../../utils/schemas/enterPasswordSchema';
import enterPasswordValidator from '../../../utils/validators/enterPasswordValidator';
import { FieldsWrapper } from './styled';
import SubmitButton from '../_common/SubmitButton';
import Password from '../_common/Password';
import { useCompleteBetaSignUp } from '../../../hooks/registration';
import { useNotificationManager } from '../../../hooks/useNotificationManager';

const TOAST_TITLE = 'Password';
const TOAST_TIMEOUT = 500;
const BETA_CODE_SUCCESS_TITLE = 'Verify Beta Code';
const BETA_CODE_SUCCESS_MESSAGE = 'Beta registration is completed';

const EnterPasswordForm = ({ betaAccessToken, emailAddress, registrationMethod }) => {
  const { t } = useTranslation();

  const { completeBetaSignUpAndLogin, loading, error, betaSignUpCompleted } = useCompleteBetaSignUp({
    betaAccessToken,
    email: emailAddress,
    registrationMethod,
  });

  useNotificationManager('error', t(error), t(TOAST_TITLE), TOAST_TIMEOUT);

  useEffect(() => {
    if (betaSignUpCompleted) {
      NotificationManager.success(t(BETA_CODE_SUCCESS_MESSAGE), t(BETA_CODE_SUCCESS_TITLE), TOAST_TIMEOUT);
    }
  }, [betaSignUpCompleted, t]);

  const handleSubmit = async (values, actions) => {
    const password = values[enterPasswordFieldNames.password];
    try {
      completeBetaSignUpAndLogin(password);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={enterPasswordValidator}
      validateOnBlur
      disabled={loading}
    >
      <Form>
        <FieldsWrapper>
          {enterPasswordFields.map(({ field, label, type }) => (
            <Password key={field} name={field} type={type} label={label} />
          ))}
          <Box mt="22px">
            <SubmitButton isLoading={loading}>{t('Continue')}</SubmitButton>
          </Box>
        </FieldsWrapper>
      </Form>
    </Formik>
  );
};

EnterPasswordForm.propTypes = {
  betaAccessToken: string.isRequired,
  emailAddress: string.isRequired,
  registrationMethod: string.isRequired,
};

export default EnterPasswordForm;
