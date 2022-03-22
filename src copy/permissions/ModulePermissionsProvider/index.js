import { useEffect } from 'react';
import { arrayOf } from 'prop-types';
import { usePermissionsContext } from '../context';
import { permissionPropType } from '../constants';

const ModulePermissionsProvider = ({ children, permissions }) => {
  const { registerPermissions } = usePermissionsContext();

  useEffect(() => {
    registerPermissions(permissions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions]); // ignore registerPermissions

  return children;
};

ModulePermissionsProvider.propTypes = {
  permissions: arrayOf(permissionPropType),
};

ModulePermissionsProvider.defaultProps = {
  permissions: [],
};

export default ModulePermissionsProvider;
