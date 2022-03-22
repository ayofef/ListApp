import { SEARCH_KEYS } from '../../../utils/filterToSearchParams/constants';
import { getTransformSearchParamsToFilter } from '../../../utils/filterToSearchParams/getTransformSearchParamsToFilter';

const transformSearchParamsToFilter = getTransformSearchParamsToFilter([
  SEARCH_KEYS.issueStatus,
  SEARCH_KEYS.issueType,
  SEARCH_KEYS.issuePriority,
  SEARCH_KEYS.date,
]);

export { transformSearchParamsToFilter };
