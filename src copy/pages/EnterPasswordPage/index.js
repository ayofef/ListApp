import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import PureLayout from '../../components/layouts/PureLayout';
import PureLayoutBox from '../../components/layouts/PureLayoutBox';
import EnterPasswordForm from '../../components/forms/EnterPasswordForm';
import { useRegistrationSearchParams } from '../../hooks/registration';
import { UI_ROUTES } from '../../constants/routes';

const TITLE = 'Password';

const EnterPasswordPage = memo(() => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const { betaAccessToken, emailAddress, registrationMethod } = useRegistrationSearchParams();

  useEffect(() => {
    const isMissingRequiredParam = [betaAccessToken, emailAddress, registrationMethod].some(isEmpty);
    if (isMissingRequiredParam) {
      push(UI_ROUTES.signIn);
    }
  }, [push, betaAccessToken, emailAddress, registrationMethod]);

  return (
    <PureLayout>
      <PureLayoutBox>
        <Box mb="30px">
          <h1>{t(TITLE)}</h1>
        </Box>

        <EnterPasswordForm
          betaAccessToken={betaAccessToken}
          emailAddress={emailAddress}
          registrationMethod={registrationMethod}
        />
      </PureLayoutBox>
    </PureLayout>
  );
});

export default EnterPasswordPage;
