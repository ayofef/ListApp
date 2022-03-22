import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import { useParams } from 'react-router-dom';
import { GET_PAYMENT_FLOW } from '../utils/queries/flows/flowsQueries';
import { useNotificationManager } from './useNotificationManager';

const useGetPaymentFlow = () => {
  const { t } = useTranslation();
  const { id: flowId } = useParams();
  const id = flowId?.trim() || 'default';

  const { data, error, loading: _loading, refetch } = useQuery(GET_PAYMENT_FLOW, {
    variables: {
      id,
    },
    fetchPolicy: 'no-cache',
    skip: !id,
  });

  useNotificationManager('error', t(error?.message), 'Payment Flows', 5000);
  const flow = data?.getPaymentFlow ?? {};
  const connectionIds = flow?.enabledGateways;

  const loading = _loading && isEmpty(flow);
  const refetchLoading = _loading;

  return {
    flow,
    flowId: flow?.id,
    connectionIds,
    error,
    loading,
    refetch,
    refetchLoading,
  };
};

export default useGetPaymentFlow;
