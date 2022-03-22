import { useMemo } from 'react';
import { useGetPaymentListWithFilter } from './useGetPaymentListWithFilter';
import { useGetPaymentListWithSearch } from './useGetPaymentListWithSearch';
import useSearch from '../useSearch';
import { getFilterData } from './getFilterData';
import { getSearchFilterData } from './getSearchFilterData';
import { ROWS_PER_PAGE } from './constant';

const useGetPaymentList = () => {
  const [searchParams] = useSearch();
  const search = searchParams?.search ?? '';
  const after = searchParams?.page ? searchParams.page - 1 : 0;
  const filter = searchParams?.filter;
  const sort = searchParams?.sort;
  const searchFilter = searchParams?.searchFilter;

  const filterOptions = useMemo(
    () => ({
      variables: {
        first: ROWS_PER_PAGE,
        after,
        data: getFilterData({ filter, sort }),
      },
      skip: Boolean(search),
      fetchPolicy: 'network-only', // https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies
    }),
    [after, filter, search, sort]
  );

  const searchOptions = useMemo(
    () => ({
      variables: {
        first: ROWS_PER_PAGE,
        input: search,
        searchFilter: getSearchFilterData(searchFilter),
        after,
      },
    }),
    [after, search, searchFilter]
  );

  const paymentsWithFilter = useGetPaymentListWithFilter(filterOptions);
  const paymentsWithSearch = useGetPaymentListWithSearch(searchOptions);
  if (search || searchFilter) {
    return { ...paymentsWithSearch, isShowWaypoint: false, onEnterHandler: () => {} };
  }
  return paymentsWithFilter;
};

export { useGetPaymentList };
