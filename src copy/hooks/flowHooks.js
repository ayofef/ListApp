import { useQuery } from '@apollo/client';

import { GET_FLOWS } from '../utils/queries/flows/queries';

export const useGetFlows = () => {
  const { data, error, loading, refetch } = useQuery(GET_FLOWS, {});

  const getFlows = data?.getFlows ?? [];
  return { getFlows, error, loading, refetch };
};
