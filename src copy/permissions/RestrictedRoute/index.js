import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { string } from 'prop-types';
import usePermission from '../hooks/usePermission';
import { defaultNoPermissionPath } from '../constants';

const RestrictedRoute = ({ permission, noPermissionPath, ...props }) => {
  const [hasPermission] = usePermission(permission);

  return hasPermission ? <Route {...props} /> : <Redirect to={noPermissionPath ?? defaultNoPermissionPath} />;
};

RestrictedRoute.propTypes = {
  ...(Route.propTypes ?? {}),
  permission: string.isRequired,
  noPermissionPath: string,
};

RestrictedRoute.defaultProps = {
  ...(Route.defaultProps ?? {}),
  noPermissionPath: defaultNoPermissionPath,
};

export default RestrictedRoute;
