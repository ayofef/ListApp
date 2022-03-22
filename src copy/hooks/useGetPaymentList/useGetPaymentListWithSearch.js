import { useEffect, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import { GQL_M_PAYMENT_SEARCH } from '../../utils/queries/payments/paymentsMutation';
import { transformPaymentToRow } from '../../pages/DataTables/AllPayments/tableData';
import { useNotificationManager } from '../useNotificationManager';
import { getPageInfo } from './getPageInfo';
import { getRows } from './getRows';

const useGetPaymentListWithSearch = ({ variables }) => {
  const { t } = useTranslation();
  const [searchPromise, { loading, error, data }] = useMutation(GQL_M_PAYMENT_SEARCH);
  useNotificationManager('error', error?.message, t('Payment Search'), 5000);

  useEffect(() => {
    const { input, searchFilter } = variables;
    if (!input && isEmpty(searchFilter)) {
      return undefined;
    }

    let controller = null;
    const timerId = setTimeout(() => {
      controller = window.AbortController && new AbortController();
      const options = {
        variables,
        ...(controller && { context: { fetchOptions: { signal: controller.signal } } }),
      };

      searchPromise(options).finally(() => {
        controller = null;
        clearTimeout(timerId);
      });
    }, 300);

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }

      if (controller) {
        controller.abort();
      }
    };
  }, [variables, searchPromise]);

  const edges = data?.searchInPayments?.edges;
  const pageInfoRef = data?.searchInPayments?.pageInfo;
  const availableKnownValues = data?.searchInPayments?.availableKnownValues;

  const rows = useMemo(() => getRows({ edges, transformFn: transformPaymentToRow }), [edges]);
  const pageInfo = useMemo(() => getPageInfo({ pageInfo: pageInfoRef }), [pageInfoRef]);

  return {
    loading,
    error,
    rows,
    availableKnownValues,
    source: 'SEARCH',
    pageInfo: pageInfo,
    totalSize: pageInfoRef?.totalSize,
  };
};

export { useGetPaymentListWithSearch };
