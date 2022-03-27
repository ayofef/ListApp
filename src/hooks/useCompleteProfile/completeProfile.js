import { supabase } from '../../client/supabaseClient';
import { handleToast, TOAST_TYPES } from '../../constants/toast';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { generateNewProject, DB_PROJECTS_KEY } from '../../constants/task';
import { DB_PROFILES_KEY } from '../../constants/profile';

export const completeProfile = async ({ name, actions, setLoading, profile, setProfile, push }) => {
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
