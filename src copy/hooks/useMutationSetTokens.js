import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';

import { useGlobalContext } from '../containers/App/context';

const useMutationSetTokens = (mutation, mutationName, mutationOptions) => {
  const { setRefreshToken, setToken } = useGlobalContext();
  const [mutate, { data, loading, error }] = useMutation(mutation, mutationOptions);

  useEffect(() => {
    if (loading || !isEmpty(error)) return;

    const { token, refreshToken } = data?.[mutationName] || {};

    if (token && refreshToken) {
      setRefreshToken(refreshToken);
      setToken(token);
    }
  }, [data, loading, error, mutationName, setRefreshToken, setToken]);

  return [mutate, { loading, error }];
};

export default useMutationSetTokens;
