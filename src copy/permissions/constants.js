import { shape, string, bool, objectOf } from 'prop-types';

const permissionPropType = shape({
  id: string.isRequired,
  default: bool,
  plans: objectOf(
    shape({
      default: bool,
      roles: objectOf(bool),
    })
  ),
  roles: objectOf(bool),
});

const defaultNoPermissionPath = '/';

const ROLES = {
  admin: 'ADMIN',
  owner: 'OWNER',
  developer: 'DEVELOPER',
  operator: 'OPERATOR',
};

const PLANS = {
  launch: 'Launch',
  rise: 'Rise',
  scale: 'Scale',
};

export { permissionPropType, defaultNoPermissionPath, ROLES, PLANS };
