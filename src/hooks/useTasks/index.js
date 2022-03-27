import { useCallback, useEffect, useState } from 'react';
import { getProjects } from './getProjects';
import { updateProject } from './updateProject';
import { updateProjects, UPDATE_PROJECT_OPREATION_KEYS } from './updateProjects';

const useTasks = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProjects({ setProjects, setLoading });
  }, []);

  const handleUpdateProject = useCallback(
    async ({ id, updatedProjectObject }) => {
      await updateProject({ projects, setProjects, id, updatedProjectObject, setLoading });
    },
    [projects]
  );

  const handleAddProject = useCallback(
    async ({ newProject }) => {
      await updateProjects({
        projects,
        setProjects,
        newProject,
        operationType: UPDATE_PROJECT_OPREATION_KEYS.add,
        setLoading,
      });
    },
    [projects]
  );

  const handleDeleteProject = useCallback(
    async ({ id }) => {
      await updateProjects({
        projects,
        setProjects,
        id,
        operationType: UPDATE_PROJECT_OPREATION_KEYS.delete,
        setLoading,
      });
    },
    [projects]
  );

  return {
    projectsLoading: loading,
    projects,
    setProjects,
    handleUpdateProject,
    handleAddProject,
    handleDeleteProject,
  };
};

export { useTasks };
