import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { GET_VALID_OPERATORS_FOR } from '../../../utils/queries/flows/queries';

const useValidOperatorsFor = ({ type, property }) => {
  const { loading, error, data } = useQuery(GET_VALID_OPERATORS_FOR, {
    variables: {
      type,
      property,
    },
    skip: !type,
  });

  const validOperatorsOptions = useMemo(() => {
    return data?.getValidOperatorsFor?.map((operator) => ({
      value: operator,
      title: operator?.replace(/_/g, ' ').toLowerCase(),
    }));
  }, [data?.getValidOperatorsFor]);

  return {
    loading,
    error,
    validOperators: data?.getValidOperatorsFor,
    validOperatorsOptions,
  };
};

export default useValidOperatorsFor;
