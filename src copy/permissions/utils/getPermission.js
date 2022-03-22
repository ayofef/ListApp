/*
{
  id: string;
  default?: boolean; // priority: 4, false if not specified
  plans?: {
    [plan]?: {
      default?: boolean; // priority: 2 (plan, if there is no plan->role permission)
      roles?: {
        [role]?: boolean; // priority: 1 (plan->role permission)
      };
    };
  };
  roles?: {
    [role]?: boolean; // priority: 3 (role, if there are no plans permissions)
  };
}
*/
const getPermission = (permissionId, userRole, activePlan, permissionsMap) => {
  const permission = permissionsMap[permissionId];
  const planRoleAccess = permission?.plans?.[activePlan]?.roles?.[userRole]; // priority: 1
  const defaultPlanAccess = permission?.plans?.[activePlan]?.default; // priority: 2
  const roleAccess = permission?.roles?.[userRole]; // priority: 3
  const defaultPermissionAccess = permission?.default; // priority: 4

  const hasAccess = planRoleAccess ?? defaultPlanAccess ?? roleAccess ?? defaultPermissionAccess ?? false;

  return hasAccess;
};

export { getPermission };
