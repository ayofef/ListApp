import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { useGlobalContext } from '../containers/App/context';

import { SET_CUSTOMER_METADATA } from '../utils/queries/public/publicMutations';
import { getStorageValue } from '../client/links/demoLink/storage';

const useSetCustomerMetadata = () => {
  const { getMeData, getMeRefetch } = useGlobalContext();
  const customerMetadata = getMeData?.we?.metadata;
  const [setCustomerMetadata, { data, loading }] = useMutation(SET_CUSTOMER_METADATA);

  const setMetadata = useCallback(
    (value) => {
      const isDemo = getStorageValue();

      if (isDemo) {
        /* setCustomerMetadata is not available for demo user */
        return;
      }

      setCustomerMetadata({
        variables: {
          metadata: {
            ...customerMetadata,
            ...value,
          },
        },
      }).then(() => getMeRefetch());
    },
    [setCustomerMetadata, customerMetadata, getMeRefetch]
  );
  return { setMetadata, data, loading };
};

export default useSetCustomerMetadata;
