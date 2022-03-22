import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LINKED_PAYMENT_FLOW } from '../../../utils/queries/connections/connectionsQueries';

export const useGetPaymentFlowLinkedToConnection = (connectionId) => {
  const { data, loading: paymentFlowLoading, error } = useQuery(GET_LINKED_PAYMENT_FLOW, {
    variables: {
      connectionId,
    },
    skip: !connectionId,
    fetchPolicy: 'no-cache',
  });

  const linkedPaymentFlows = useMemo(() => data?.findPaymentFlows ?? [], [data?.findPaymentFlows]);

  return {
    linkedPaymentFlows,
    paymentFlowLoading,
    error,
  };
};
