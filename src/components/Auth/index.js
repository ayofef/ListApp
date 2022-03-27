import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { supabase } from '../../client/supabaseClient';
import AuthForm from '../Forms/AuthForm';
import FormContainer from '../Forms/FormContainer';
import { handleToast, TOAST_TYPES } from '../../constants/toast';

const generateAuthHeaderLabel = (isSignInAuthType) => `Sign ${isSignInAuthType ? 'in' : 'up'} to your account`;

function Auth() {
  const [loading, setLoading] = useState(false);
  const [isSignInAuthType, setIsSignInAuthType] = useState(true);
  const toggleAuthType = () => setIsSignInAuthType((prevState) => !prevState);

  //convert error toast to inline

  const handleAuth = async (values, actions) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email: values.email });

      if (!isEmpty(error)) {
        handleToast(TOAST_TYPES.error, error.error_description);
        return;
      }

      handleToast(TOAST_TYPES.success, `Check your email for sign ${isSignInAuthType ? 'in' : 'up'} link!`);
    } catch (error) {
      handleToast(TOAST_TYPES.error, error.error_description || error.message);
    } finally {
      setLoading(false);
      actions.setSubmitting(false);
      actions.resetForm();
    }
  };

  const headerLabel = generateAuthHeaderLabel(isSignInAuthType);
  return (
    <FormContainer title={headerLabel}>
      <AuthForm
        loading={loading}
        handleSubmit={handleAuth}
        toggleAuthType={toggleAuthType}
        isSignInAuthType={isSignInAuthType}
      />
    </FormContainer>
  );
}

export default Auth;
