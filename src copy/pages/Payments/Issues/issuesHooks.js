import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import isEmpty from 'lodash/isEmpty';

import { transformNodeToRow } from './tableData';
import { GET_PAYMENT_ISSUES } from '../../../utils/queries/issues/issuesQueries';
import { CREATE_ISSUES, UPDATE_ISSUE } from '../../../utils/queries/issues/issuesMutations';
import { useLoadingIndicator } from '../../../hooks/useLoadingIndicator';
import { globalLoadingConst } from '../../../constants/globalLoadingConsts';
import useSearch from '../../../hooks/useSearch';
import { transformSearchParamsToFilter } from './transformSearchParamsToFilter';

const ISSUE_MUTATION_OPTION = {
  refetchQueries: [{ query: GET_PAYMENT_ISSUES }],
  awaitRefetchQueries: true,
};

const DEFAULT_FILTER = {
  issueStatus: ['OPEN', 'REFUNDED', 'COMPLETED'],
};

const useGetIssueList = () => {
  const [{ filter }] = useSearch();

  const variables = useMemo(
    () => ({
      data: {
        filter: isEmpty(filter) ? transformSearchParamsToFilter(DEFAULT_FILTER) : transformSearchParamsToFilter(filter),
      },
    }),
    [filter]
  );

  const { loading, error, data } = useQuery(GET_PAYMENT_ISSUES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const rows = useMemo(() => {
    const set = new Set();

    return data?.listPaymentIssues?.reduce((acc, payment) => {
      const id = payment?.id;
      if (!id || set.has(id)) {
        return acc;
      }

      set.add(id);

      return [...acc, transformNodeToRow(payment)];
    }, []);
  }, [data?.listPaymentIssues]);

  return {
    loading,
    error,
    rows,
  };
};

export const useCreateIssue = () => {
  const [createIssue, { data, loading, error }] = useMutation(CREATE_ISSUES, ISSUE_MUTATION_OPTION);

  useLoadingIndicator(globalLoadingConst.createIssue, loading);

  return {
    createIssue,
    data,
    loading,
    error,
  };
};

export const useUpdateIssue = () => {
  const [updateIssue, { data, loading, error }] = useMutation(UPDATE_ISSUE, ISSUE_MUTATION_OPTION);

  useLoadingIndicator(globalLoadingConst.updateIssue, loading);

  return {
    updateIssue,
    data,
    loading,
    error,
  };
};

export default useGetIssueList;
