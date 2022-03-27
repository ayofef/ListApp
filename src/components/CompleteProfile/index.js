import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { supabase } from '../../client/supabaseClient';
import CompleteProfileForm from '../Forms/CompleteProfileForm';
import FormContainer from '../Forms/FormContainer';
import { useGlobalContext } from '../../context';
import { generateNewProject, DB_PROJECTS_KEY } from '../../constants/task';
import { DB_PROFILES_KEY } from '../../constants/profile';
import { handleToast, TOAST_TYPES } from '../../constants/toast';
import { getErrorMessage } from '../../utils/getErrorMessage';

function CompleteProfile() {
  const [loading, setLoading] = useState(false);
  const { profile, setProfile } = useGlobalContext();
  const { push } = useHistory();

  const handleAuth = async ({ name }, actions) => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updatedProfileObj = {
        id: user.id,
        ...profile,
        username: name,
        updated_at: new Date(),
      };

      const projectObj = {
        ...generateNewProject(user.id),
      };

      // Update profile with new name
      const { data, profileError } = await supabase.from(DB_PROFILES_KEY).upsert(updatedProfileObj);
      // create new project for first time user
      const { error: projectError } = await supabase.from(DB_PROJECTS_KEY).upsert(projectObj, {
        returning: 'minimal',
      });
      // update user metadata
      const { error: updateMetadataError } = await supabase.auth.api.updateUserById(user.id, {
        user_metadata: { hasCompletedProfile: true },
      });
      // refresh session to get the latest user metadata
      const { error: refreshSessionError } = await supabase.auth.refreshSession();

      const { errorMessage, hasError } = getErrorMessage([
        profileError,
        projectError,
        updateMetadataError,
        refreshSessionError,
      ]);

      if (hasError) {
        handleToast(TOAST_TYPES.error, errorMessage);

        return;
      }

      setProfile(data[0]);
      push('/');
      handleToast(TOAST_TYPES.success, 'Registration Complete!');
    } catch (error) {
      handleToast(TOAST_TYPES.error, error?.error_description || error?.message);
    } finally {
      setLoading(false);
      actions.setSubmitting(false);
    }
  };

  return (
    <FormContainer title="Complete Profile">
      <CompleteProfileForm loading={loading} handleSubmit={handleAuth} />
    </FormContainer>
  );
}

export default CompleteProfile;
