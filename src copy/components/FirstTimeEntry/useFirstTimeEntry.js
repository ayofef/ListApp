import { useCallback } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useUserDispatch } from '../../providers/User/UserContext';
import { setIsGreet } from '../../providers/User/state/actions';
import { useSwitchDemo } from '../../hooks/useSwitchDemo';
import { useNotificationManager } from '../../hooks/useNotificationManager';
import { SET_CUSTOMER_METADATA } from '../../utils/queries/public/publicMutations';
import { mergeDeep } from '../../utils/mergeDeep';
import { FIRST_TIME_ENTRY } from '../../providers/User/utils';

const useFirstTimeEntry = () => {
  const { loading: getMetadataLoading, error: getMetadataError, data } = useQuery(
    gql`
      query GetMetadata {
        we {
          id
          metadata
        }
      }
    `,
    { fetchPolicy: 'cache-only' }
  );
  const [
    setCustomerMetadataPromise,
    { loading: setCustomerMetadataLoading, error: setCustomerMetadataError },
  ] = useMutation(SET_CUSTOMER_METADATA);
  const metadata = data?.we?.metadata;
  const isLoading = getMetadataLoading || setCustomerMetadataLoading;
  useNotificationManager('error', getMetadataError?.message, 'Get Metadata');
  useNotificationManager('error', setCustomerMetadataError?.message, 'Update Customer metadata');
  const switchDemo = useSwitchDemo();
  const userDispatch = useUserDispatch();
  const handleFTE = useCallback(() => {
    if (isLoading) {
      return;
    }
    const options = {
      variables: { metadata: mergeDeep(metadata, { [FIRST_TIME_ENTRY]: { isGreeted: true } }) },
    };
    if (!metadata?.[FIRST_TIME_ENTRY]?.isGreeted) {
      setCustomerMetadataPromise(options).then(({ errors }) => {
        if (errors) {
          return;
        }

        userDispatch(setIsGreet(true));
        switchDemo();
      });
    }
  }, [metadata, setCustomerMetadataPromise, userDispatch, isLoading, switchDemo]);

  return { handleFTE, isLoading };
};

export default useFirstTimeEntry;
