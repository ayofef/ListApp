import { updateSubtask } from '../constant';

const MOCK_TASKS = [
  {
    id: '1',
    title: 'Task 1',
    subTasks: [],
  },
  {
    id: '2',
    title: 'Task 2',
    subTasks: [
      { id: '201', title: 'Task 201' },
      { id: '202', title: 'Task 202' },
    ],
  },
];

const EXPECTED_MOCK_TASK = [
  {
    id: '1',
    title: 'Task 1',
    subTasks: [],
  },
  {
    id: '2',
    title: 'Task 2',
    subTasks: [
      { id: '201', title: 'Task 201' },
      { id: '202', title: 'Task 202 - Updated' },
    ],
  },
];

describe('updateSubtask', () => {
  it('should return undefined if tasks is undefined', () => {
    const updateSubtaskObj = updateSubtask({ tasks: undefined });

    expect(updateSubtaskObj).toBeUndefined();
  });

  it('should return null if tasks is null and parentId is defined', () => {
    const updateSubtaskObj = updateSubtask({ tasks: null, parentId: '1' });

    expect(updateSubtaskObj).toBeNull();
  });

  it('should return the passed tasks if tasks is defined and subTaskId is undefined', () => {
    const updateSubtaskObj = updateSubtask({ tasks: [] });

    expect(updateSubtaskObj).toStrictEqual([]);
  });

  it('should return the updated tasks if all params are defined', () => {
    const updateSubtaskObj = updateSubtask({
      tasks: MOCK_TASKS,
      parentId: '2',
      subTaskId: '202',
      newContent: 'Task 202 - Updated',
      fieldKey: 'title',
    });

    expect(updateSubtaskObj).toStrictEqual(EXPECTED_MOCK_TASK);
  });
});
