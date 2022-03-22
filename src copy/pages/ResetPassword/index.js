import React from 'react';
import ResetPasswordForm from '../../components/forms/ResetPasswordForm';

import PureLayout from '../../components/layouts/PureLayout';
import PureLayoutBox from '../../components/layouts/PureLayoutBox';

const ResetPassword = () => (
  <PureLayout>
    <PureLayoutBox>
      <ResetPasswordForm />
    </PureLayoutBox>
  </PureLayout>
);

export default ResetPassword;
