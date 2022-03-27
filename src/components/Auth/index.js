import React from 'react';

import AuthForm from '../Forms/AuthForm';
import FormContainer from '../Forms/FormContainer';
import { generateAuthHeaderLabel } from './constant';
import { useSignInAndSignUp } from '../../hooks/useAuth/useSignInAndSignUp';

function Auth() {
  const { loading, isSignInAuthType, toggleAuthType, handleSignInAndSignUp } = useSignInAndSignUp();

  const headerLabel = generateAuthHeaderLabel(isSignInAuthType);

  return (
    <FormContainer title={headerLabel}>
      <AuthForm
        loading={loading}
        handleSubmit={handleSignInAndSignUp}
        toggleAuthType={toggleAuthType}
        isSignInAuthType={isSignInAuthType}
      />
    </FormContainer>
  );
}

export default Auth;
