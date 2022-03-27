import { getErrorMessage } from '../../utils/getErrorMessage';
import { supabase } from '../../client/supabaseClient';
import { handleToast, TOAST_TYPES } from '../../constants/toast';
import { DB_PROFILES_KEY } from '../../constants/profile';
import { DB_PROJECTS_KEY } from '../../constants/task';

export const deleteAccount = async ({ setGlobalLoading, userId, setSession }) => {
  try {
    setGlobalLoading(true);

    const { error: deleteProfileError } = await supabase.from(DB_PROFILES_KEY).delete().match({ id: userId });
    const { errors: deleteProjectsError } = await supabase.from(DB_PROJECTS_KEY).delete().match({ user_id: userId });
    const { error: deleteUserError } = await supabase.auth.api.deleteUser(userId);

    const { errorMessage, hasError } = getErrorMessage([deleteProfileError, deleteProjectsError, deleteUserError]);

    if (hasError) {
      handleToast(TOAST_TYPES.error, errorMessage.error_description);
      return;
    }

    setSession(null);
  } catch (error) {
    handleToast(TOAST_TYPES.error, error.error_description || error.message);
  } finally {
    setGlobalLoading(false);
  }
};
