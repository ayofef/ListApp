import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { GET_CARDS } from '../../utils/queries/dataTables/cards';
import { useNotificationManager } from '../useNotificationManager';
import { ROWS_PER_PAGE, getPageInfo } from './useGetCustomers';
import useSearch from '../useSearch';
import { parseBySearch, parseBySort, parseByFilter } from './constant';

export const useGetCards = (_first) => {
  const [searchParams] = useSearch();
  const after = searchParams?.page ? searchParams.page - 1 : 0;
  const { search, sort, filter } = searchParams;
  const first = _first ?? ROWS_PER_PAGE;

  const { error, loading, data } = useQuery(GET_CARDS, { variables: { first, after } });
  const { t } = useTranslation();

  useNotificationManager('error', t(error?.message), 'Data tables', 5000);

  const cards = useMemo(() => {
    const _data = data?.listCards?.edges ?? [];
    if (_first) {
      return _data;
    }

    if (search) {
      return parseBySearch(_data, search, 'cards');
    }
    if (sort) {
      return parseBySort(_data, sort);
    }

    if (filter) {
      return parseByFilter(_data, filter);
    }

    return _data;
  }, [data, search, sort, filter, _first]);

  const pageInfo = useMemo(() => getPageInfo(data?.listCards?.pageInfo) ?? {}, [data]);

  return { error, loading, cards, pageInfo };
};
