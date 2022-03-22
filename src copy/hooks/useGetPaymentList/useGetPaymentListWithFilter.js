import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { transformNodeToRow } from '../../pages/DataTables/AllPayments/tableData';
import { GET_PAYMENT_LIST } from '../../utils/queries/payments/paymentsQueries';
import { useNotificationManager } from '../useNotificationManager';
import { getPageInfo } from './getPageInfo';
import { getRows } from './getRows';

/**
 * @param {Object} options
 * */
const useGetPaymentListWithFilter = (options) => {
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(GET_PAYMENT_LIST, options);
  useNotificationManager('error', error?.message, t('Payment List'), 5000);

  const edges = data?.listPayments?.edges;
  const pageInfoRef = data?.listPayments?.pageInfo;

  const rows = useMemo(() => getRows({ edges, transformFn: transformNodeToRow }), [edges]);
  const pageInfo = useMemo(() => getPageInfo({ pageInfo: pageInfoRef }), [pageInfoRef]);

  return {
    loading,
    error,
    rows,
    source: 'FILTER',
    pageInfo,
    totalSize: pageInfoRef?.totalSize,
  };
};

export { useGetPaymentListWithFilter };
