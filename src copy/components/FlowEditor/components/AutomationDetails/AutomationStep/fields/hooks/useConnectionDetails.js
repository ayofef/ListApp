import { useQuery } from '@apollo/client';
import compact from 'lodash/compact';
import { useMemo } from 'react';
import { useNotificationManager } from '../../../../../../../hooks/useNotificationManager';
import { GET_CONNECTIONS } from '../../../../../../../utils/queries/connections/connectionsQueries';

export const useConnectionDetails = (connectionIds) => {
  const { data, error, loading } = useQuery(GET_CONNECTIONS, {
    fetchPolicy: 'cache-first',
  });

  useNotificationManager('error', error?.message, 'Connection Details', 5000);

  return useMemo(() => {
    const _connectionIds = compact(connectionIds ?? []);
    const _connectionDetails = compact(data?.listConnections ?? []);
    return {
      connections: _connectionDetails.filter((c) => _connectionIds.includes(c.id)) ?? [],
      connectionsLoading: loading,
    };
  }, [connectionIds, data?.listConnections, loading]);
};
