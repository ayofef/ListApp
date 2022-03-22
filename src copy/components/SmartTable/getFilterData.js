import { transformSearchParamsToFilter } from '../../utils/transformSearchParamsToFilter';
import { transformSearchParamsToSort } from '../../utils/transformSearchParamsToSort';

/**
 * @param {Object} arg
 * @param {Object} [arg.filter]
 * @param {Object} [arg.sort]
 *
 * @return {Object|null}
 * */
export const getFilterData = ({ filter, sort }) => ({
  filter: (filter && transformSearchParamsToFilter(filter)) || null,
  sort: (sort && transformSearchParamsToSort(sort)) || null,
});
