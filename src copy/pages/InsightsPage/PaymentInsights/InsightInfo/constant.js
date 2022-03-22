const INTENT_STATUS_MAP = {
  active: 'active',
  inactive: 'inactive',
};

const INTENT_STATUS_VARIABLE_KEY_MAP = {
  [INTENT_STATUS_MAP.active]: 'activeIntervalSize',
  [INTENT_STATUS_MAP.inactive]: 'inactiveIntervalSize',
};

// used when linking to the Payment intents page
const INTENT_STATUS_PAYMENTS_FILTER_MAP = {
  [INTENT_STATUS_MAP.active]: ['active'],

  [INTENT_STATUS_MAP.inactive]: ['inactive'],
};

export { INTENT_STATUS_MAP, INTENT_STATUS_VARIABLE_KEY_MAP, INTENT_STATUS_PAYMENTS_FILTER_MAP };
