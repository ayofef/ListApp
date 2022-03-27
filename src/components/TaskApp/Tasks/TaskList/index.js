import PropTypes from 'prop-types';
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import Box from '@material-ui/core/Box';

import EditableField from '../EditableField';
import PlusButton from '../../../atoms/IconButton';
import { useTodoEvents } from './useTodoEvents';

// using recursive technique to render subtasks
function TaskList({ tasks, parentId, projectData, handleUpdateProject }) {
  const { handleTaskUpdate, handleAddNewTask, handleMarkAsComplete } = useTodoEvents({
    parentId,
    projectData,
    handleUpdateProject,
  });

  return (
    <Box>
      {tasks?.map(({ id, title, subTasks }) => {
        if (!isEmpty(subTasks)) {
          return (
            <Box key={id}>
              <EditableField
                id={id}
                content={title}
                handleContentUpdate={handleTaskUpdate}
                handleAddSubTask={handleAddNewTask}
                handleMarkAsComplete={handleMarkAsComplete}
                showNewSubtaskButton
              />

              <Box ml="24px">
                <TaskList
                  key={id}
                  tasks={subTasks}
                  parentId={id}
                  handleUpdateProject={handleUpdateProject}
                  projectData={projectData}
                />
              </Box>
            </Box>
          );
        }

        return (
          <EditableField
            key={id}
            id={id}
            content={title}
            handleContentUpdate={handleTaskUpdate}
            showNewSubtaskButton={!parentId}
            handleAddSubTask={handleAddNewTask}
            handleMarkAsComplete={handleMarkAsComplete}
          />
        );
      })}

      {!parentId && (
        <Box mt="18px" ml="6px">
          <PlusButton type="button" onClick={handleAddNewTask} label="Add Task" width="140px" height="36px" />
        </Box>
      )}
    </Box>
  );
}

const TODO_PROP_TYPES = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    subTasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
      })
    ),
  })
);

TaskList.propTypes = {
  tasks: TODO_PROP_TYPES,
  parentId: PropTypes.string,
  projectData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    project: PropTypes.shape({
      tasks: TODO_PROP_TYPES,
    }),
  }).isRequired,
  handleUpdateProject: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  parentId: undefined,
  tasks: [],
};

export default TaskList;
