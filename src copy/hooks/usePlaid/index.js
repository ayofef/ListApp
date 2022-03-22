import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SIMPLE_CONNECTIONS } from '../../utils/queries/connections/connectionsQueries';

export const usePlaid = () => {
  const { data, loading, refetch } = useQuery(GET_SIMPLE_CONNECTIONS, {
    variables: {
      status: 'CONNECTED',
    },
  });
  const isPlaidConnected = useMemo(() => {
    return data?.listConnections?.some((item) => item?.name?.indexOf('Plaid') > -1);
  }, [data]);

  return {
    refetchPlaid: refetch,
    isPlaidConnected,
    loading,
  };
};
