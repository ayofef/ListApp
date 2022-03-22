import { getPermission } from '../getPermission';

describe('getPermission', () => {
  it('should return false if permission is not defined', () => {
    const permissionId = 'test_permission';
    const userRole = 'test_role';
    const activePlan = 'test_plan';
    const permissionsMap = {};

    const hasPermission = getPermission(permissionId, userRole, activePlan, permissionsMap);

    expect(hasPermission).toBeFalsy();
  });

  it('should return plan->role permission if defined', () => {
    const permissionId = 'test_permission';
    const userRole = 'test_role';
    const activePlan = 'test_plan';
    const permissionsMap = {
      [permissionId]: {
        default: false,
        plans: {
          [activePlan]: {
            default: false,
            roles: {
              [userRole]: true,
            },
          },
        },
        roles: {
          [userRole]: false,
        },
      },
    };

    const hasPermission = getPermission(permissionId, userRole, activePlan, permissionsMap);

    expect(hasPermission).toBeTruthy();
  });

  it('should return plan default permission if plan->role permission is not defined', () => {
    const permissionId = 'test_permission';
    const userRole = 'test_role';
    const activePlan = 'test_plan';
    const permissionsMap = {
      [permissionId]: {
        default: false,
        plans: {
          [activePlan]: {
            default: true,
          },
        },
        roles: {
          [userRole]: false,
        },
      },
    };

    const hasPermission = getPermission(permissionId, userRole, activePlan, permissionsMap);

    expect(hasPermission).toBeTruthy();
  });

  it('should return role permission if plan permission is not defined', () => {
    const permissionId = 'test_permission';
    const userRole = 'test_role';
    const activePlan = 'test_plan';
    const permissionsMap = {
      [permissionId]: {
        default: false,
        roles: {
          [userRole]: true,
          other: false,
        },
      },
    };

    const hasPermission = getPermission(permissionId, userRole, activePlan, permissionsMap);

    expect(hasPermission).toBeTruthy();
  });

  it('should return default permission if plan and role permissions are not defined', () => {
    const permissionId = 'test_permission';
    const userRole = 'test_role';
    const activePlan = 'test_plan';
    const permissionsMap = {
      [permissionId]: {
        default: true,
        roles: {
          other: false,
        },
      },
    };

    const hasPermission = getPermission(permissionId, userRole, activePlan, permissionsMap);

    expect(hasPermission).toBeTruthy();
  });
});
