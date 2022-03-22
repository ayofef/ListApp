import { ROLES } from '../../permissions/constants';

const GETTING_STARTED_PERMISSIONS_IDS = {
  gettingStarted: 'appGettingStarted', // Getting started page
};

const GETTING_STARTED_PERMISSIONS = [
  {
    // operators cannot view getting started page
    id: GETTING_STARTED_PERMISSIONS_IDS.gettingStarted,
    default: true,
    roles: {
      [ROLES.operator]: false,
    },
  },
];

export { GETTING_STARTED_PERMISSIONS, GETTING_STARTED_PERMISSIONS_IDS };
