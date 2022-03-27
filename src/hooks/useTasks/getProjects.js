import { getErrorMessage } from '../../utils/getErrorMessage';

import { supabase } from '../../client/supabaseClient';
import { handleToast, TOAST_TYPES } from '../../constants/toast';

import { DB_PROJECTS_KEY } from '../../constants/task';

export const getProjects = async ({ setProjects, setLoading }) => {
  try {
    setLoading(true);

    const user = supabase.auth.user();

    const { data, error } = await supabase.from(DB_PROJECTS_KEY).select('*').eq('user_id', user.id);

    const { hasError, errorMessage } = getErrorMessage([error]);

    if (hasError) {
      handleToast(TOAST_TYPES.error, errorMessage);
      return;
    }

    const sortedProjects = data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    setProjects(sortedProjects);
  } catch (error) {
    handleToast(TOAST_TYPES.error, error.error_description || error.message);
  } finally {
    setLoading(false);
  }
};
