import { getErrorMessage } from '../../utils/getErrorMessage';

import { supabase } from '../../client/supabaseClient';
import { handleToast, TOAST_TYPES } from '../../constants/toast';
import { DB_PROJECTS_KEY } from '../../constants/task';

export const updateProject = async ({ projects, setProjects, id, updatedProjectObject, setLoading }) => {
  try {
    setLoading(true);
    const localProjects = projects.slice();
    const indexOfUpdatedObject = localProjects.findIndex((project) => project.id === id);
    localProjects[indexOfUpdatedObject] = updatedProjectObject;

    const { error } = await supabase.from(DB_PROJECTS_KEY).update(updatedProjectObject).match({ id });

    const { hasError, errorMessage } = getErrorMessage([error]);

    if (hasError) {
      handleToast(TOAST_TYPES.error, errorMessage);
      return;
    }

    setProjects(localProjects);
  } catch (error) {
    handleToast(TOAST_TYPES.error, error.error_description || error.message);
  } finally {
    setLoading(false);
  }
};
