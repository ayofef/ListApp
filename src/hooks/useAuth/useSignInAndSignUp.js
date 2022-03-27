import { useState } from 'react';
import { signInAndSignUp } from './signInAndSignUp';

const useSignInAndSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [isSignInAuthType, setIsSignInAuthType] = useState(true);
  const toggleAuthType = () => setIsSignInAuthType((prevState) => !prevState);

  const handleSignInAndSignUp = async ({ email }, actions) => {
    await signInAndSignUp({
      email,
      setLoading,
      isSignInAuthType,
      actions,
    });
  };

  return {
    loading,
    isSignInAuthType,
    toggleAuthType,
    handleSignInAndSignUp,
  };
};

export { useSignInAndSignUp };
