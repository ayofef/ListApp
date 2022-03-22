import { SEARCH_KEYS } from './filterToSearchParams/constants';
import { getTransformSearchParamsToFilter } from './filterToSearchParams/getTransformSearchParamsToFilter';

const transformSearchParamsToFilter = getTransformSearchParamsToFilter([
  SEARCH_KEYS.dateRange,
  SEARCH_KEYS.date,
  SEARCH_KEYS.amount,
  SEARCH_KEYS.currency,
  SEARCH_KEYS.paymentStatus,
  SEARCH_KEYS.paymentMethod,
  SEARCH_KEYS.processor,
  SEARCH_KEYS.paymentType,
  SEARCH_KEYS.country,
  SEARCH_KEYS.flowId,
  SEARCH_KEYS.category,
]);

export { transformSearchParamsToFilter };
