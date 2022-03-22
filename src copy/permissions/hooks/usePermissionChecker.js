import { useCallback } from 'react';
import { useGlobalContext } from '../../containers/App/context';
import { usePermissionsContext } from '../context';
import { getPermission } from '../utils';

const usePermissionChecker = () => {
  const { permissionsMap } = usePermissionsContext();
  const { getMeData } = useGlobalContext() ?? {};

  const activePlan = getMeData?.we?.activePlan?.plan?.name;
  const userRole = getMeData?.me?.role;

  const checkPermission = useCallback(
    (permissionId) => getPermission(permissionId, userRole, activePlan, permissionsMap),
    [userRole, activePlan, permissionsMap]
  );

  return { checkPermission };
};

export default usePermissionChecker;
