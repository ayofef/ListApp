import { extendPermissionsMap } from '../extendPermissionsMap';

describe('extendPermissionsMap', () => {
  let testPermission;

  beforeEach(() => {
    testPermission = {
      id: 'test_permission',
      default: false,
      roles: {
        admin: true,
      },
    };
  });

  it('should create a new map object', () => {
    const previousPermissionsMap = {};
    const newPermissions = [];

    const updatedPermissionsMap = extendPermissionsMap(previousPermissionsMap, newPermissions);

    expect(updatedPermissionsMap).not.toBe(previousPermissionsMap);
  });

  it('should add new permissions to map', () => {
    const previousPermissionsMap = {};
    const newPermissions = [testPermission];

    const updatedPermissionsMap = extendPermissionsMap(previousPermissionsMap, newPermissions);

    expect(updatedPermissionsMap).toEqual({
      [testPermission.id]: testPermission,
    });
  });

  it('should extend previous permissions', () => {
    const previousPermission = {
      id: 'previous_permission',
      default: true,
      roles: {
        admin: false,
      },
    };

    const previousPermissionsMap = { [previousPermission.id]: previousPermission };
    const newPermissions = [testPermission];

    const updatedPermissionsMap = extendPermissionsMap(previousPermissionsMap, newPermissions);

    expect(updatedPermissionsMap).toEqual({
      [previousPermission.id]: previousPermission,
      [testPermission.id]: testPermission,
    });
  });

  it('should override previous permissions if there are conflicts', () => {
    const previousPermission = {
      id: testPermission.id,
      default: true,
      roles: {
        admin: false,
      },
    };

    const previousPermissionsMap = { [previousPermission.id]: previousPermission };
    const newPermissions = [testPermission];

    const updatedPermissionsMap = extendPermissionsMap(previousPermissionsMap, newPermissions);

    expect(updatedPermissionsMap).toEqual({
      [testPermission.id]: testPermission,
    });
  });
});
