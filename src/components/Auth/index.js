import React, { useState } from 'react';
import { supabase } from '../../client/supabaseClient';
import AuthForm from '../Forms/AuthForm';
import FormContainer from '../Forms/FormContainer';
import { handleToast, TOAST_TYPES } from '../../constants/toast';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { generateAuthHeaderLabel } from './constant';

function Auth() {
  const [loading, setLoading] = useState(false);
  const [isSignInAuthType, setIsSignInAuthType] = useState(true);
  const toggleAuthType = () => setIsSignInAuthType((prevState) => !prevState);

  const handleAuth = async (values, actions) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email: values.email });

      const { hasError, errorMessage } = getErrorMessage([error]);
      if (hasError) {
        handleToast(TOAST_TYPES.error, errorMessage);
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
