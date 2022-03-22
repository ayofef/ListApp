import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotificationManager } from './useNotificationManager';
import { GET_CONNECTIONS } from '../utils/queries/connections/connectionsQueries';

const useListConnections = ({ flow }) => {
  const { t } = useTranslation();

  const { data, error, loading } = useQuery(GET_CONNECTIONS, {
    variables: {
      types: ['PAYMENT_GATEWAY'],
      status: ['CONNECTED', 'BROKEN'],
    },
    fetchPolicy: 'no-cache',
  });

  useNotificationManager('error', t(error?.message), 'List Connections', 5000);

  const availablePaymentProcessors = useMemo(() => data?.listConnections ?? [], [data?.listConnections]);

  const { availableProcessors, connectedProcessors, defaultProcessor } = useMemo(() => {
    const _default = flow?.defaultGateway;
    const enabled = flow?.enabledGateways ?? [];
    const _available = availablePaymentProcessors?.filter((el) => !enabled?.includes(el?.id));
    const _connected = availablePaymentProcessors
      ?.filter((el) => enabled?.includes(el?.id))
      ?.sort((a, b) => (b?.id === _default) - (a?.id === _default));
    return { availableProcessors: _available, connectedProcessors: _connected, defaultProcessor: _default };
  }, [availablePaymentProcessors, flow?.defaultGateway, flow?.enabledGateways]);

  const hasProcessorErrors = useMemo(
    () => connectedProcessors.some((connection) => connection?.status !== 'CONNECTED'),
    [connectedProcessors]
  );

  const enabledPaymentMethods = flow?.paymentMethods ?? [];

  return {
    availableProcessors,
    connectedProcessors,
    defaultProcessor,
    hasProcessorErrors,
    error,
    loading,
    enabledPaymentMethods,
  };
};

export default useListConnections;
