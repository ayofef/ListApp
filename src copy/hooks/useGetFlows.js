import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GET_FLOW_LIST } from '../utils/queries/flows/flowsQueries';
import { useNotificationManager } from './useNotificationManager';
import { STATUSES } from '../constants/flows';

const DRAFT_FLOW_STATUS = new Set([STATUSES.NEVER_PUBLISHED, STATUSES.DISABLED, STATUSES.ARCHIVED]);
const LIVE_FLOW_STATUS = new Set([STATUSES.ACTIVE, STATUSES.NEEDS_CONFIG]);

export const useGetFlows = () => {
  const { data, error, loading, refetch } = useQuery(GET_FLOW_LIST);
  const { t } = useTranslation();

  useNotificationManager('error', t(error?.message), 'Payment Flows', 5000);

  const allFlows = useMemo(
    () => data?.listPaymentFlows?.filter((el) => Boolean(el) && el?.status !== 'ARCHIVED') ?? [],
    [data]
  );

  const { draftFlows, liveFlows } = useMemo(
    () =>
      allFlows.reduce(
        (acc, flow) => {
          if (DRAFT_FLOW_STATUS.has(flow?.status)) {
            acc.draftFlows.push(flow);
          }

          if (LIVE_FLOW_STATUS.has(flow?.status)) {
            acc.liveFlows.push(flow);
          }

          return acc;
        },
        { draftFlows: [], liveFlows: [] }
      ),
    [allFlows]
  );

  return { allFlows, draftFlows, liveFlows, error, loading, refetch };
};
