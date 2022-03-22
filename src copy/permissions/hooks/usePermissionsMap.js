import { useCallback, useState } from 'react';
import { extendPermissionsMap } from '../utils';

const usePermissionsMap = (permissions) => {
  const [permissionsMap, setPermissionsMap] = useState(() => extendPermissionsMap({}, permissions));

  const registerPermissions = useCallback(
    (newPermissions) => {
      const newPermissionsMap = extendPermissionsMap(permissionsMap, newPermissions);
      setPermissionsMap(newPermissionsMap);
    },
    [permissionsMap]
  );

  return { permissionsMap, registerPermissions };
};

export default usePermissionsMap;
