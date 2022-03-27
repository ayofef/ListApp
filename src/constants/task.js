import { v4 as uniqueId } from 'uuid';

const DB_PROJECTS_KEY = 'projects';

/**
 * Converted to functions so new ids are generated everytime
 */

const generateNewProject = (userId) => ({
  id: uniqueId(),
  user_id: userId,
  project: {
    title: 'New List',
    tasks: [
      {
        id: uniqueId(),
        title: 'New Task',
        subTasks: [],
      },
    ],
  },
});

const generateNewTask = () => ({
  id: uniqueId(),
  title: 'New Task',
  subTasks: [],
});

const generateNewSubTask = () => ({
  id: uniqueId(),
  title: 'New Subtask',
});

export { generateNewProject, generateNewTask, generateNewSubTask, DB_PROJECTS_KEY };
