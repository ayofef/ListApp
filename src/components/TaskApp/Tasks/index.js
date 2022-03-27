import React, { useEffect, useMemo } from 'react';
import Box from '@material-ui/core/Box';
import { useHistory, useParams } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { debounce } from '../../../utils/debounce';
import EditableField from './EditableField';
import { useTaskAppContext } from '../taskAppContext';
import TaskList from './TaskList';
import ListLoadingState from '../../atoms/ListLoadingState';
import EmptyState from '../../atoms/EmptyState';
import { StyledTasksWrapper } from './styled';

function Tasks() {
  const { push } = useHistory();
  const { id } = useParams();
  const { projects, handleUpdateProject, isLoading } = useTaskAppContext();

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

  return (
    <StyledTasksWrapper>
      {isLoading && <ListLoadingState count={6} />}

      {!isLoading && isEmpty(projects) && <EmptyState margin="40px 0" message="You current have no task" />}
      {!isLoading && !isEmpty(projects) && (
        <>
          {/* Editable Header */}
          <Box mb="18px">
            <EditableField
              handleContentUpdate={handleUpdateProjectTitle}
              content={projectData.project?.title}
              fontSize="32px"
              fontWeight="600"
              showMarkAsCompleteInput={false}
            />
          </Box>

          {/* Tasks */}

          <TaskList
            tasks={projectData.project?.tasks}
            projectData={projectData}
            handleUpdateProject={handleUpdateProject}
          />
        </>
      )}
    </StyledTasksWrapper>
  );
}

export default Tasks;
