import { useLazyQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { GET_FLOW_STATS } from '../utils/queries/flows/flowsQueries';
import { useNotificationManager } from './useNotificationManager';

export const useGetFlowStats = () => {
  const [getFlowStats, { error, loading, data }] = useLazyQuery(GET_FLOW_STATS);
  const { t } = useTranslation();
  useNotificationManager('error', t(error?.message), 'Payment Flows', 5000);
  const flowStats = useMemo(() => data?.getPaymentFlowStats ?? {}, [data]);
  return [getFlowStats, { error, loading, flowStats }];
};
