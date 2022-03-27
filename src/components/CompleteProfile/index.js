import React from 'react';

import CompleteProfileForm from '../Forms/CompleteProfileForm';
import FormContainer from '../Forms/FormContainer';
import { useGlobalContext } from '../../context';
import { useCompleteProfile } from '../../hooks/useCompleteProfile';

function CompleteProfile() {
  const { profile, setProfile } = useGlobalContext();
  const { loading, handleCompleteProfile } = useCompleteProfile({ setProfile, profile });

  return (
    <FormContainer title="Complete Profile">
      <CompleteProfileForm loading={loading} handleSubmit={handleCompleteProfile} />
    </FormContainer>
  );
}

export default CompleteProfile;
