import React, { useMemo } from 'react';
import { arrayOf } from 'prop-types';
import { PermissionsContextProvider } from '../context';
import usePermissionsMap from '../hooks/usePermissionsMap';
import { permissionPropType } from '../constants';

const ApplicationPermissionsProvider = ({ children, permissions }) => {
  const { permissionsMap, registerPermissions } = usePermissionsMap(permissions);

  const permissionsProviderValue = useMemo(() => ({ permissionsMap, registerPermissions }), [
    permissionsMap,
    registerPermissions,
  ]);

  return <PermissionsContextProvider value={permissionsProviderValue}>{children}</PermissionsContextProvider>;
};

ApplicationPermissionsProvider.propTypes = {
  permissions: arrayOf(permissionPropType),
};

ApplicationPermissionsProvider.defaultProps = {
  permissions: [],
};

export default ApplicationPermissionsProvider;
