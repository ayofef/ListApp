import { useMemo } from 'react';
import usePermissionChecker from './usePermissionChecker';

const usePermission = (permissionId) => {
  const { checkPermission } = usePermissionChecker();

  const hasPermission = useMemo(() => checkPermission(permissionId), [checkPermission, permissionId]);

  return [hasPermission];
};

export default usePermission;
