import { debounce } from '../../../../utils/debounce';
import { generateNewTask, generateNewSubTask } from '../../../../constants/task';
import { generateUpdatedTaskObj, updateTask, updateSubtask } from './constant';

const useTodoEvents = ({ projectData, parentId, handleUpdateProject }) => {
  const updateTaskObj = generateUpdatedTaskObj(projectData);

  const handleTaskUpdate = debounce(async ({ newContent, id }) => {
    const localTasks = projectData.project.tasks.slice();
    let updatedTasks = null;

    if (parentId) {
      updatedTasks = updateSubtask({
        tasks: localTasks,
        parentId,
        subTaskId: id,
        newContent,
      });
    } else {
      updatedTasks = updateTask({
        tasks: localTasks,
        id,
        newContent,
      });
    }

    handleUpdateProject({ id: projectData.id, updatedProjectObject: updateTaskObj(updatedTasks) });
  }, 800);

  const handleAddNewTask = async (e) => {
    const localTasks = projectData.project.tasks.slice();
    const { taskid: parentTaskId } = e.currentTarget.dataset;
    const newTask = generateNewTask();

    if (parentTaskId) {
      const indexParentObject = localTasks.findIndex((task) => task.id === parentTaskId);
      const subTasks = localTasks[indexParentObject].subTasks.slice();

      const newSubTask = generateNewSubTask();
      //add new task to subTasks array
      subTasks.push(newSubTask);
      //update localTasks with updated subTasks
      localTasks[indexParentObject] = {
        ...localTasks[indexParentObject],
        subTasks: subTasks,
      };
    } else {
      localTasks.push(newTask);
    }

    handleUpdateProject({ id: projectData.id, updatedProjectObject: updateTaskObj(localTasks) });
  };

  const handleMarkAsComplete = async ({ id }) => {
    const localTasks = projectData.project.tasks.slice();
    let updatedTasks = null;

    if (parentId) {
      const indexParentObject = localTasks.findIndex((task) => task.id === parentId);
      const subTasks = localTasks[indexParentObject].subTasks.slice();
      //remove subTask from subTasks array
      const updatedSubTask = subTasks.filter((task) => task.id !== id);
      //update localTasks with updated subTasks
      localTasks[indexParentObject] = {
        ...localTasks[indexParentObject],
        subTasks: updatedSubTask,
      };
      updatedTasks = localTasks;
    } else {
      updatedTasks = localTasks.filter((task) => task.id !== id);
    }

    handleUpdateProject({ id: projectData.id, updatedProjectObject: updateTaskObj(updatedTasks) });
  };

  return {
    handleTaskUpdate,
    handleAddNewTask,
    handleMarkAsComplete,
  };
};

export { useTodoEvents };
