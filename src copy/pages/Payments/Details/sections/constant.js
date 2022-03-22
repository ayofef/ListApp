import capitalize from '@material-ui/core/utils/capitalize';
import THEME from '../../../../constants/theme';

const TIMELINE_KEYS_MAP = {
  billing: 'billing',
  checkoutStarted: 'intentStarted',
  completeCheckout: 'completeIntent',
  delivery: 'delivery',
  paymentIntent: 'paymentAttempts',
  shipping: 'shipping',
};

const INTENT_KEY_LABEL_MAP = {
  [TIMELINE_KEYS_MAP.checkoutStarted]: 'Started intent',
  [TIMELINE_KEYS_MAP.shipping]: 'Shipping details',
  [TIMELINE_KEYS_MAP.delivery]: 'Delivery details',
  [TIMELINE_KEYS_MAP.billing]: 'Billing details',
  [TIMELINE_KEYS_MAP.paymentIntent]: 'Payment attempt',
  [TIMELINE_KEYS_MAP.completeCheckout]: 'Complete intent',
};

const TIMELINE_STATUS_COLOR_MAP = {
  INTENT: '#C1C3C6',
  INACTIVE: '#C1C3C6',
  ACTIVE: THEME.statusColors.succeeded,
  COMPLETE: THEME.primaryColors.primary,
  [INTENT_KEY_LABEL_MAP[TIMELINE_KEYS_MAP.checkoutStarted]]: THEME.statusColors.succeeded,
  [INTENT_KEY_LABEL_MAP[TIMELINE_KEYS_MAP.shipping]]: THEME.statusColors.succeeded,
  [INTENT_KEY_LABEL_MAP[TIMELINE_KEYS_MAP.delivery]]: THEME.statusColors.succeeded,
  [INTENT_KEY_LABEL_MAP[TIMELINE_KEYS_MAP.billing]]: THEME.statusColors.succeeded,
  [INTENT_KEY_LABEL_MAP[TIMELINE_KEYS_MAP.paymentIntent]]: THEME.statusColors.succeeded,
  [INTENT_KEY_LABEL_MAP[TIMELINE_KEYS_MAP.completeCheckout]]: THEME.statusColors.succeeded,
};

const INTENT_TIMELINE_ARRAY = [
  {
    key: TIMELINE_KEYS_MAP.checkoutStarted,
    title: INTENT_KEY_LABEL_MAP[TIMELINE_KEYS_MAP.checkoutStarted],
  },
  {
    key: TIMELINE_KEYS_MAP.shipping,
    title: INTENT_KEY_LABEL_MAP[TIMELINE_KEYS_MAP.shipping],
  },
  {
    key: TIMELINE_KEYS_MAP.delivery,
    title: INTENT_KEY_LABEL_MAP[TIMELINE_KEYS_MAP.delivery],
  },
  {
    key: TIMELINE_KEYS_MAP.billing,
    title: INTENT_KEY_LABEL_MAP[TIMELINE_KEYS_MAP.billing],
  },
  {
    key: TIMELINE_KEYS_MAP.paymentIntent,
    title: INTENT_KEY_LABEL_MAP[TIMELINE_KEYS_MAP.paymentIntent],
  },
  {
    key: TIMELINE_KEYS_MAP.completeCheckout,
    title: INTENT_KEY_LABEL_MAP[TIMELINE_KEYS_MAP.completeCheckout],
  },
];

const PREVENT_STATUS_ANIMATION_MAP = ['INACTIVE', 'COMPLETE'];

const transformUiStatusLabel = (status) => {
  if (typeof status !== 'string') return status;

  return capitalize(status.toLowerCase().replace(/_/g, ' '));
};

export {
  INTENT_TIMELINE_ARRAY,
  TIMELINE_KEYS_MAP,
  INTENT_KEY_LABEL_MAP,
  TIMELINE_STATUS_COLOR_MAP,
  PREVENT_STATUS_ANIMATION_MAP,
  transformUiStatusLabel,
};
