import { ROLES } from '../../permissions/constants';

const SETTINGS_PERMISSIONS_IDS = {
  userManagement: 'user-management', // Settings -> User Management (inc Invite + Permission + Teams)
  connections: 'connections', // Settings -> Connections
  developers: 'developers', // Settings -> Developers
  billing: 'billing', // Billing + Acc Modification
};

const SETTINGS_PERMISSIONS = [
  {
    // only owners and admins can manage users
    id: SETTINGS_PERMISSIONS_IDS.userManagement,
    roles: {
      [ROLES.owner]: true,
      [ROLES.admin]: true,
    },
  },
  {
    // operators cannot manage connections
    id: SETTINGS_PERMISSIONS_IDS.connections,
    default: true,
    roles: {
      [ROLES.operator]: false,
    },
  },
  {
    // operators cannot see "Developers" section
    id: SETTINGS_PERMISSIONS_IDS.developers,
    default: true,
    roles: {
      [ROLES.operator]: false,
    },
  },
  {
    // only owner can modify billing
    id: SETTINGS_PERMISSIONS_IDS.billing,
    roles: {
      [ROLES.owner]: true,
    },
  },
];

export { SETTINGS_PERMISSIONS, SETTINGS_PERMISSIONS_IDS };
