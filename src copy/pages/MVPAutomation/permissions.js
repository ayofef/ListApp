import { ROLES } from '../../permissions/constants';

const AUTOMATION_PERMISSIONS_IDS = {
  automations: 'automations',
};

const AUTOMATION_PERMISSIONS = [
  {
    // operators cannot manage/view automations
    id: AUTOMATION_PERMISSIONS_IDS.automations,
    default: true,
    roles: {
      [ROLES.operator]: false,
    },
  },
];

export { AUTOMATION_PERMISSIONS, AUTOMATION_PERMISSIONS_IDS };
