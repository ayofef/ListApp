import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GQL_Q_GETTING_STARTED } from '../../utils/queries/getttingStarted/queries';

export const useGetEntryData = () => {
  const { data, loading } = useQuery(GQL_Q_GETTING_STARTED, {
    fetchPolicy: 'no-cache',
  });

  const gettingStartedChecklist = useMemo(() => data?.getGettingStartedDetails || {}, [data?.getGettingStartedDetails]);

  return { gettingStartedChecklist, loading };
};
