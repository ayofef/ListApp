import { getErrorMessage } from '../../utils/getErrorMessage';
import { supabase } from '../../client/supabaseClient';
import { handleToast, TOAST_TYPES } from '../../constants/toast';
import { DB_PROJECTS_KEY } from '../../constants/task';

export const UPDATE_PROJECT_OPERATION_KEYS = {
  add: 'add',
  delete: 'delete',
};

export const updateProjects = async ({ projects, setProjects, newProject, operationType, id, setLoading }) => {
  try {
    setLoading(true);
    let error = null;
    let localProjects = projects.slice();

    if (operationType === UPDATE_PROJECT_OPERATION_KEYS.add) {
      const { error: errorObj } = await supabase.from(DB_PROJECTS_KEY).upsert(newProject, {
        returning: 'minimal',
      });
      error = errorObj;

      localProjects.push(newProject);
    }

    if (operationType === UPDATE_PROJECT_OPERATION_KEYS.delete) {
      const { error: errorObj } = await supabase.from(DB_PROJECTS_KEY).delete().match({ id });
      error = errorObj;

      const updatedProjects = projects.filter((project) => project.id !== id);
      localProjects = updatedProjects;
    }

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
