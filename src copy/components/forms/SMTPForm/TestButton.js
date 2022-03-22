import React, { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { NotificationManager } from 'react-notifications';
import { ButtonRounded } from '../../atoms';
import { GQL_M_SMTP_SETTINGS_TEST } from '../../../utils/queries/customer/customerMutations';

const NOTIFICATION_TITLE = 'Test Settings';

const TestButton = () => {
  const { t } = useTranslation();
  const [testPromise] = useMutation(GQL_M_SMTP_SETTINGS_TEST);
  const { values, isSubmitting, isValid, setStatus, status } = useFormikContext();
  const handleTest = useCallback(() => {
    setStatus('testing');

    testPromise({ variables: values })
      .then(({ errors, data }) => {
        if (errors) {
          NotificationManager.error('Errors', NOTIFICATION_TITLE);

          return;
        }
        const testSmtpCredentials = data?.testSmtpCredentials;
        const { method, message } = testSmtpCredentials
          ? { method: 'success', message: 'The test is passed.' }
          : { method: 'error', message: 'The test is failed.' };

        NotificationManager[method](message, NOTIFICATION_TITLE);
      })
      .finally(() => {
        setStatus(undefined);
      });
  }, [setStatus, testPromise, values]);
  const disabled = isSubmitting || !isValid || status === 'testing';

  return (
    <ButtonRounded type="button" variant="outlined" color="primary" onClick={handleTest} disabled={disabled}>
      {t('Test')}
    </ButtonRounded>
  );
};

export default TestButton;
