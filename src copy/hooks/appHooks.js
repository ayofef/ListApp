import { useMutation, useQuery } from '@apollo/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CREATE_SPEND_REQUEST, EDIT_SPEND_REQUEST, REQUEST_APP } from '../utils/queries/public/publicMutations';
import { LIST_REQUESTS } from '../utils/queries/public/publicQueries';
import { EXPORT_TRANSACTIONS } from '../utils/queries/transactions/transactionsMutations';
import { GET_TRANSACTIONS_EXPORT } from '../utils/queries/transactions/transactionsQueries';

export const useGlobalLoading = () => {
  const [loadingObj, setLoadingObj] = useState({});

  const setGlobalLoading = useCallback((key, status) => {
    setLoadingObj((prev) => ({ ...prev, [key]: status }));
  }, []);
  const globalLoading = useMemo(() => {
    return Object.values(loadingObj).filter(Boolean).length !== 0;
  }, [loadingObj]);

  return {
    globalLoading,
    setGlobalLoading,
  };
};

export const useNewRequest = (mutation, mutationName, history) => {
  const [mutate, { data, loading, error }] = useMutation(CREATE_SPEND_REQUEST);

  useEffect(() => {}, [data, loading, error, mutationName, history]);

  return [mutate, { data, loading, error }];
};

export const useRequestApp = (mutation, mutationName, history) => {
  const [mutate, { data, loading, error }] = useMutation(REQUEST_APP);

  useEffect(() => {}, [data, loading, error, mutationName, history]);

  return [mutate, { data, loading, error }];
};

export const usePurchaseRequest = (mutation, mutationName, history) => {
  const [mutate, { data, loading, error }] = useMutation(EDIT_SPEND_REQUEST);

  useEffect(() => {}, [data, loading, error, mutationName, history]);

  return [mutate, { data, loading, error }];
};

export const useListRequestsData = (getMeData, filter) => {
  const { data, error, loading, refetch, networkStatus } = useQuery(LIST_REQUESTS, {
    variables: {
      filter: filter || 'PENDING',
    },
  });

  return { data, error, loading, refetch, networkStatus };
};

export const useExportTransactions = () => {
  const [exportId, setExportId] = useState();
  const [localLoading, setLocalLoading] = useState(false);

  const { data: transactionsExportData, startPolling, stopPolling } = useQuery(GET_TRANSACTIONS_EXPORT, {
    skip: !exportId,
    variables: {
      id: exportId,
    },
  });
  useEffect(() => {
    if (transactionsExportData?.getTransactionExport?.status === 'COMPLETE') {
      stopPolling();
      setLocalLoading(false);
    }
  }, [transactionsExportData, stopPolling]);

  const [exportTransactions] = useMutation(EXPORT_TRANSACTIONS);

  const exportTransactionsHandler = (data) => {
    setLocalLoading(true);
    exportTransactions({ variables: { ids: data } }).then((res) => {
      setExportId(res.data?.exportTransactions?.id);
      startPolling(1000);
    });
  };
  return {
    downloadTransactions: exportTransactionsHandler,
    transactionsExportData: transactionsExportData?.getTransactionExport,
    transactionsExportLoading: localLoading,
  };
};
