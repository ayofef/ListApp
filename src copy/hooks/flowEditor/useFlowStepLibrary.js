import { useQuery } from '@apollo/client';
import { GET_FLOW_STEP_LIBRARY } from '../../utils/queries/flows/queries';

export const useFlowStepLibrary = (flowId) => {
  const { data, error, loading, refetch } = useQuery(GET_FLOW_STEP_LIBRARY, {
    variables: { flowId: flowId },
    skip: !flowId,
  });

  return {
    stepLibraryData: data,
    stepLibraryError: error,
    stepLibraryLoading: loading,
    stepLibraryRefetch: refetch,
  };
};
