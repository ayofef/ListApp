import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { completeProfile } from './completeProfile';

const useCompleteProfile = ({ setProfile, profile }) => {
  const [loading, setLoading] = useState(false);
  const { push } = useHistory();

  const handleCompleteProfile = async ({ name }, actions) => {
    await completeProfile({
      name,
      setLoading,
      actions,
      push,
      setProfile,
      profile,
    });
  };

  return {
    loading,
    handleCompleteProfile,
  };
};

export { useCompleteProfile };
