import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import PureLayout from '../../components/layouts/PureLayout';
import PureLayoutBox from '../../components/layouts/PureLayoutBox';
import { useHandleRegistrationFlowRedirect } from '../../hooks/registration';

const SignUpForm = React.lazy(() => import('../../components/forms/SignUpPersonalDetailsForm'));

const Fallback = () => (
  <Box display="flex" justifyContent="center">
    <CircularProgress size={24} />
  </Box>
);

const SignUpPersonalDetails = () => {
  const { t } = useTranslation();
  useHandleRegistrationFlowRedirect();

  return (
    <PureLayout theme="dark">
      <PureLayoutBox theme="dark">
        <Box mb="40px">
          <h1>
            {t('Personal')}
            <br />
            {t('details')}
          </h1>
        </Box>

        <React.Suspense fallback={<Fallback />}>
          <SignUpForm />
        </React.Suspense>
      </PureLayoutBox>
    </PureLayout>
  );
};

export default SignUpPersonalDetails;
