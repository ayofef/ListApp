const STATUS_ACTION_MAP = {
  INVITED: 'deactivate',
  ACTIVE: 'deactivate',
  INACTIVE: 'reactivate',
};

const STATUS_ACTION_SUCCESS_TITLE_MAP = {
  deactivate: 'User successfully deactivated',
  reactivate: 'User successfully reactivated',
};

const STATUS_ACTION_SUCCESS_MESSAGE_MAP = {
  deactivate: 'Deactivate user',
  reactivate: 'Reactivate user',
};

const MODAL_TEXT_TITLE_MAP = {
  deactivate: 'Are you sure you want to deactivate user?',
  reactivate: 'Are you sure you want to reactivate user?',
};

const MODAL_TEXT_SUBMIT = {
  deactivate: 'Deactivate',
  reactivate: 'Reactivate',
};

const USER_ROLES = {
  owner: 'OWNER',
  admin: 'ADMIN',
  developer: 'DEVELOPER',
  operator: 'OPERATOR',
};

const USER_ROLES_MAP = {
  [USER_ROLES.owner]: 'Owner',
  [USER_ROLES.admin]: 'Admin',
  [USER_ROLES.developer]: 'Developer',
  [USER_ROLES.operator]: 'Operator',
};

export {
  STATUS_ACTION_MAP,
  STATUS_ACTION_SUCCESS_TITLE_MAP,
  STATUS_ACTION_SUCCESS_MESSAGE_MAP,
  MODAL_TEXT_TITLE_MAP,
  MODAL_TEXT_SUBMIT,
  USER_ROLES,
  USER_ROLES_MAP,
};
