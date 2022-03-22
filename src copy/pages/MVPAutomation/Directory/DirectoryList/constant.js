const parseCategoryLabel = (category) =>
  category
    ?.toLowerCase()
    ?.split('_')
    ?.join(' ');

const SIDEBAR_WIDTH = '248px';
const SIDEBAR_WIDTH_IN_MODAL = '231px';

const CATEGORY_KEY = 'automationCategories';

const RECOMMENDATION_KEY = 'recommended';

const PAYMENT_FLOW_KEY = 'paymentFlow';

export {
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_IN_MODAL,
  CATEGORY_KEY,
  RECOMMENDATION_KEY,
  PAYMENT_FLOW_KEY,
  parseCategoryLabel,
};
