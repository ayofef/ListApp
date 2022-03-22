import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { GET_CUSTOMERS } from '../../utils/queries/dataTables/customers';
import { useNotificationManager } from '../useNotificationManager';
import useSearch from '../useSearch';
import { parseBySearch, parseBySort, parseByFilter } from './constant';

const ROWS_PER_PAGE = 45;
const getPageInfo = (pageInfo = {}) => {
  const endCursor = parseInt(pageInfo?.endCursor, 10);
  const totalPages = Math.ceil(pageInfo?.totalSize / ROWS_PER_PAGE);

  return {
    endCursor,
    hasNextPage: pageInfo?.hasNextPage,
    hasPreviousPage: pageInfo?.hasPreviousPage,
    totalPages,
  };
};

const useGetCustomers = (_first) => {
  const { t } = useTranslation();

  const [searchParams] = useSearch();
  const after = searchParams?.page ? searchParams.page - 1 : 0;
  const first = _first ?? ROWS_PER_PAGE;
  const { search, sort, filter } = searchParams;

  const { error, loading, data } = useQuery(GET_CUSTOMERS, { variables: { first, after } });

  useNotificationManager('error', t(error?.message), 'Data tables', 5000);

  const customers = useMemo(() => {
    const _data = data?.listCustomers?.edges ?? [];

    if (_first) {
      return _data;
    }

    if (search) {
      return parseBySearch(_data, search, 'customer');
    }
    if (sort) {
      return parseBySort(_data, sort);
    }
    if (filter) {
      return parseByFilter(_data, filter);
    }

    return _data;
  }, [data, search, sort, filter, _first]);

  const pageInfo = useMemo(() => getPageInfo(data?.listCustomers?.pageInfo) ?? {}, [data]);

  return { error, loading, customers, pageInfo };
};

export { ROWS_PER_PAGE, getPageInfo, useGetCustomers };
