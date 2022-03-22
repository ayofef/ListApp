import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { GET_FLOW_INSTANCES_WITH_PAGINATION } from '../../../utils/queries/flows/queries';
import usePageInfo from './usePageInfo';
import { prepareFlowInstances } from '../FlowMonitorDetailsDrawer/helpers';

export const useGetFlowInstances = (options) => {
  const { data, loading } = useQuery(GET_FLOW_INSTANCES_WITH_PAGINATION, options);
  const getFlowInstances = data?.getFlowInstancesWithPagination;
  const isDataReady = Boolean(!loading && getFlowInstances);
  const flowInstances = getFlowInstances?.instances;
  const pageInfo = usePageInfo(getFlowInstances?.pageInfo);
  const flowInstancePrepared = useMemo(() => prepareFlowInstances(flowInstances || []), [flowInstances]);
  return {
    flowInstances: flowInstancePrepared,
    pageInfo,
    loading,
    isDataReady,
  };
};
