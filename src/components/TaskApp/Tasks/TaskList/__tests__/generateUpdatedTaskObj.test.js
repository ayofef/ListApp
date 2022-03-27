import { generateUpdatedTaskObj } from '../constant';

const MOCK_PROJECT_DATA = {
  id: '1',
  user_id: '001',
  project: {
    id: '007',
    tasks: [{ foo: 'foo' }],
  },
};
const MOCK_UPDATE = [{ foo: 'foo' }, { bar: 'bar' }];

const MOCK_PROJECT_DATA_UNDEFINED = {
  id: '1',
  user_id: '001',
  project: undefined,
};

describe('generateUpdatedTaskObj', () => {
  it('should return a function on first call', () => {
    const updateTaskObj = generateUpdatedTaskObj({});
    expect(updateTaskObj).toBeInstanceOf(Function);
  });

  it('should return null if projectData is null', () => {
    const updateTaskObj = generateUpdatedTaskObj(null);
    const getUpdate = updateTaskObj({});
    expect(getUpdate).toBeNull();
  });

  it('should return null if projectData is defined and update is null', () => {
    const updateTaskObj = generateUpdatedTaskObj({});
    const getUpdate = updateTaskObj(null);
    expect(getUpdate).toBeNull();
  });

  it('should return null if projectData is null and update is null', () => {
    const updateTaskObj = generateUpdatedTaskObj(null);
    const getUpdate = updateTaskObj(null);
    expect(getUpdate).toBeNull();
  });

  it('should return null if projectData is null and update is null', () => {
    const updateTaskObj = generateUpdatedTaskObj(undefined);
    const getUpdate = updateTaskObj(null);
    expect(getUpdate).toBeNull();
  });

  it('should return null if both params are defined but projectData.project is undefined', () => {
    const updateTaskObj = generateUpdatedTaskObj(MOCK_PROJECT_DATA_UNDEFINED);
    const getUpdate = updateTaskObj([]);
    expect(getUpdate).toBeNull();
  });

  it('should generate the update if both params are defined', () => {
    const updateTaskObj = generateUpdatedTaskObj(MOCK_PROJECT_DATA);
    const getUpdate = updateTaskObj(MOCK_UPDATE);

    const EXPECTED_PROJECT_DATA = {
      id: '1',
      user_id: '001',
      project: {
        id: '007',
        tasks: MOCK_UPDATE,
      },
    };

    expect(getUpdate).toMatchObject(EXPECTED_PROJECT_DATA);
  });
});
