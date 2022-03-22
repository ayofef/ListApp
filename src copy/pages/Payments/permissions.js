import { ROLES, PLANS } from '../../permissions/constants';

const PAYMENTS_PERMISSIONS_IDS = {
  /* payment management features (shared view + Payment
 issues, Refunds, comment */
  paymentsManagement: 'paymentsManagement',
};

const PAYMENTS_PERMISSIONS = [
  {
    id: PAYMENTS_PERMISSIONS_IDS.paymentsManagement,
    default: false,
    plans: {
      [PLANS.rise]: {
        default: true,
        roles: {
          [ROLES.developer]: false,
        },
      },
      [PLANS.scale]: {
        default: true,
        roles: {
          [ROLES.developer]: false,
        },
      },
    },
  },
];

export { PAYMENTS_PERMISSIONS, PAYMENTS_PERMISSIONS_IDS };
