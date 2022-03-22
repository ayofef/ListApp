import React from 'react';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import { initialValues, FIELD_NAME, validationSchema } from './formSettings';
import Fields from './Fields';
import SubmitButton from '../_common/SubmitButton';
import { GQL_M_SIGNUP_REASON } from '../../../utils/queries/customer/customerMutations';
import { GET_ME_AND_WE } from '../../../utils/queries/public/publicQueries';

const MUTATE_OPTIONS = {
  refetchQueries: [{ query: GET_ME_AND_WE }],
  awaitRefetchQueries: true,
};

const SignUpSurveyForm = () => {
  const { t } = useTranslation();
  const [updateSignUpReason] = useMutation(GQL_M_SIGNUP_REASON, MUTATE_OPTIONS);

  const handleSubmit = React.useCallback(
    ({ signUpReason }) => {
      updateSignUpReason({ variables: { options: signUpReason } }).then(({ errors }) => {
        if (errors) {
          NotificationManager.error(t(errors[0]?.message), 'Signup Reason', 5000);
        }
      });
    },
    [updateSignUpReason, t]
  );

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validationSchema}>
      <Form>
        <Box mb="32px">
          <Fields name={FIELD_NAME} />
        </Box>

        <SubmitButton>{t('common.continueText')}</SubmitButton>
      </Form>
    </Formik>
  );
};

export default SignUpSurveyForm;
