import { useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import useSearch from '../useSearch';
import { useGetViews } from '../useGetView';

import { transformSearchParamsToFilter } from '../../utils/transformSearchParamsToFilter';
import { transformSearchParamsToSort } from '../../utils/transformSearchParamsToSort';
import { transformSortToSearchParams } from '../../utils/transformSortToSearchParams';
import { transformFilterToSearchParams } from '../../utils/filterToSearchParams/transformFilterToSearchParams';

const useSearchChanges = () => {
  const [searchParams] = useSearch();
  const views = useGetViews();
  const match = useRouteMatch('/payments/views/:viewId');
  const viewId = match?.params?.viewId;
  const view = viewId && views?.[viewId];
  const filter = view?.filter;
  const sort = view?.sort;
  const searchFilter = searchParams.filter;
  const searchSort = useMemo(() => searchParams?.sort ?? {}, [searchParams]);
  const stateSearchFilter = useMemo(() => (filter ? transformFilterToSearchParams(filter) : undefined), [filter]);
  const stateSearchSort = useMemo(() => (sort ? transformSortToSearchParams(sort) : {}), [sort]);
  const initialValues = useMemo(
    () => ({
      id: viewId,
      name: view?.name ?? '',
      filter: transformSearchParamsToFilter(searchFilter ?? {}),
      sort: transformSearchParamsToSort(searchSort ?? {}),
    }),
    [viewId, view?.name, searchFilter, searchSort]
  );

  /*
   * 1 case: !isEmpty(searchParams) && !isEqual(searchFilter, stateSearchParams)
   * 2 case: !isEmpty(searchParams) && !isEqual(searchSort, stateSearchSort)
   * */

  const hasChanges =
    !isEmpty(searchParams) && (!isEqual(searchFilter, stateSearchFilter) || !isEqual(searchSort, stateSearchSort));
  return { hasChanges, initialValues };
};

export default useSearchChanges;
