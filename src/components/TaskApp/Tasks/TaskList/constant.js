import { isDefined } from '../../../../utils/isDefined';

const generateUpdatedTaskObj = (projectData) => {
  return function getUpdate(update) {
    if (typeof update !== 'object' || typeof projectData !== 'object' || typeof projectData?.project !== 'object')
      return null;

    return {
      ...projectData,
      project: {
        ...projectData.project,
        tasks: update,
      },
    };
  };
};

const DEFAULT_FIELD_KEY = 'title';

const updateArrayItem = ({ items, id, fieldKey, newContent }) => {
  if (!Array.isArray(items) || !isDefined(id) || !isDefined(fieldKey)) return items;
  const _items = items.slice();
  const indexOfItemToUpdate = _items.findIndex((item) => item.id === id);

  _items[indexOfItemToUpdate] = {
    ..._items[indexOfItemToUpdate],
    [fieldKey]: newContent,
  };
  return _items;
};

const updateTask = ({ tasks, id, newContent, fieldKey }) => {
  return updateArrayItem({
    items: tasks,
    id,
    newContent,
    fieldKey: fieldKey || DEFAULT_FIELD_KEY,
  });
};

const updateSubtask = ({ tasks, parentId, subTaskId, newContent, fieldKey }) => {
  if (!Array.isArray(tasks) || !isDefined(parentId) || !isDefined(subTaskId) || !isDefined(fieldKey)) return tasks;

  const localTasks = tasks.slice();
  const indexParentTaskObject = tasks.findIndex((task) => task.id === parentId);

  const subTasks = localTasks[indexParentTaskObject].subTasks.slice();

  //update subTasks
  const updatedSubTask = updateArrayItem({
    items: subTasks,
    id: subTaskId,
    newContent,
    fieldKey: fieldKey || DEFAULT_FIELD_KEY,
  });

  //update tasks with updated subTasks
  localTasks[indexParentTaskObject] = {
    ...localTasks[indexParentTaskObject],
    subTasks: updatedSubTask,
  };

  return localTasks;
};

export { generateUpdatedTaskObj, updateTask, updateSubtask, updateArrayItem };
