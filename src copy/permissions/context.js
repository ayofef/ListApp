import { createContext, useContext } from 'react';

const PermissionsContext = createContext({
  permissionsMap: {}, // permission_id -> permission_description map
  registerPermissions: (_permissions) => {
    // Implemented in ApplicationPermissionProvider
    throw new Error('PermissionsContext.registerPermissions is not implemented.');
  },
});

const PermissionsContextProvider = PermissionsContext.Provider;
const usePermissionsContext = () => useContext(PermissionsContext);

export { PermissionsContextProvider, usePermissionsContext };
