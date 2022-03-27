import React from 'react';
import Box from '@material-ui/core/Box';
import isEmpty from 'lodash/isEmpty';

import EditableField from './EditableField';
import { useTaskAppContext } from '../taskAppContext';
import TaskList from './TaskList';
import ListLoadingState from '../../atoms/ListLoadingState';
import EmptyState from '../../atoms/EmptyState';
import { StyledTasksWrapper } from './styled';
import { useProjectData } from './useProjectData';

function Tasks() {
  const { projects, handleUpdateProject, isLoading } = useTaskAppContext();
  const { handleUpdateProjectTitle, projectData } = useProjectData({
    projects,
    handleUpdateProject,
  });

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
