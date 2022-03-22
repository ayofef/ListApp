import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import compact from 'lodash/compact';
import { GET_PAYMENT_FLOW_FOR_GATEWAYS } from '../../../../../../utils/queries/flows/flowsQueries';

const useGetConnections = ({ topFlowId }) => {
  const { data: flow, loading, refetch } = useQuery(GET_PAYMENT_FLOW_FOR_GATEWAYS, {
    variables: {
      id: topFlowId,
      status: ['CONNECTED', 'BROKEN'],
      types: ['PAYMENT_GATEWAY'],
    },
    skip: !topFlowId,
  });

  const allConnections = useMemo(() => compact(flow?.listConnections || []), [flow?.listConnections]);

  const connected = useMemo(() => compact(flow?.getPaymentFlow?.enabledGateways) || [], [flow]);

  const filteredItems = useMemo(() => allConnections?.filter((item) => connected.includes(item?.id)), [
    allConnections,
    connected,
  ]);

  const defaultValue = flow?.getPaymentFlow?.defaultGateway;

  return { allConnections, connected: filteredItems, defaultValue, loading, refetch };
};

export default useGetConnections;
