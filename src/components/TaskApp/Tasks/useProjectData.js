import { useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { debounce } from '../../../utils/debounce';

const useProjectData = ({ projects, handleUpdateProject }) => {
  const { push } = useHistory();
  const { id } = useParams();

  const projectData = useMemo(() => projects.find((project) => project?.id === id) || {}, [id, projects]);

  useEffect(() => {
    /* Display the first todo data */
    if (!id && !isEmpty(projects)) {
      const defaultId = projects[0]?.id;
      push(`task/${defaultId}`);
    }
  }, [push, id, projects]);

  /* Debounce to prevent unnecessary trigger */
  const handleUpdateProjectTitle = debounce(async ({ newContent }) => {
    const updatedProjectObject = {
      ...projectData,
      project: {
        ...projectData.project,
        title: newContent,
      },
    };
    await handleUpdateProject({ id, updatedProjectObject });
  }, 800);

  return {
    handleUpdateProjectTitle,
    projectData,
  };
};

export { useProjectData };
