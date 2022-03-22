import { useField } from 'formik';
import React, { useState } from 'react';
import { string } from 'prop-types';
import { useDebounce } from 'react-use';
import { NotificationManager } from 'react-notifications';
import HIBPPasswordChecker from 'react-have-i-been-pwned';
import { useTranslation } from 'react-i18next';

const PasswordUsageCheck = ({ fieldName }) => {
  const { t } = useTranslation();
  const [{ value }] = useField(fieldName);
  const [debouncedValue, setDebouncedValue] = useState('');
  const [sentMessage, setSentMessage] = useState('');

  useDebounce(
    () => {
      setDebouncedValue(value);
    },
    5000,
    [value]
  );

  const handleMessageShow = (pwnedData, countData) => {
    if (!pwnedData) {
      const successMessage = t('signUpForm.passwordCheckSuccess');
      if (sentMessage !== successMessage) {
        NotificationManager.success(successMessage, t('uiMessages.great'), 2500);
        setSentMessage(successMessage);
      }
    } else {
      const errorMessage =
        t('signUpForm.passwordCheckWarning.part1') +
        countData.toLocaleString() +
        t('signUpForm.passwordCheckWarning.part2');

      if (errorMessage !== sentMessage) {
        NotificationManager.error(errorMessage, t('uiMessages.warning'), 2500);
        setSentMessage(errorMessage);
      }
    }
  };

  return (
    <HIBPPasswordChecker password={debouncedValue}>
      {({ initial, loading, error: pwdCheckError, pwned, count }) => {
        if (!initial && !pwdCheckError && !loading) {
          handleMessageShow(pwned, count);
        }
        return null;
      }}
    </HIBPPasswordChecker>
  );
};

PasswordUsageCheck.propTypes = {
  fieldName: string.isRequired,
};

export default PasswordUsageCheck;
