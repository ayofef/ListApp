import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import isEqual from 'lodash/isEqual';
import { mergeDeep } from '../../utils/mergeDeep';
import { SET_CUSTOMER_METADATA } from '../../utils/queries/public/publicMutations';
import { FIRST_TIME_ENTRY, pickFields } from './utils';

const useSetCustomerMetadata = ({ metadataRef, state }) => {
  const [setCustomerMetadataPromise] = useMutation(SET_CUSTOMER_METADATA);

  useEffect(() => {
    const firstTimeEntry = metadataRef.current?.[FIRST_TIME_ENTRY];
    const payload = pickFields(state);

    if (!state.isGreeted || state.isDemo || state.isSwitching || isEqual(payload, pickFields(firstTimeEntry))) {
      return undefined;
    }

    const controller = window.AbortController && new AbortController();
    const options = {
      variables: { metadata: mergeDeep(metadataRef.current, { [FIRST_TIME_ENTRY]: payload }) },
      ...(controller && { context: { fetchOptions: { signal: controller.signal } } }),
    };

    setCustomerMetadataPromise(options).catch((err) => {
      NotificationManager.error(err?.message, 'Update Customer metadata');
    });

    return () => {
      controller?.abort();
    };
  }, [metadataRef, setCustomerMetadataPromise, state]);
  // provide ability to send customer metadata. development mode
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    // call window[Symbol.for('resetUserStore')]() to reset store from console.
    window[Symbol.for('resetUserStore')] = (value) => {
      setCustomerMetadataPromise({
        variables: { metadata: { ...metadataRef.current, [FIRST_TIME_ENTRY]: value } },
      }).then(({ errors }) => {
        if (errors) {
          NotificationManager.error('Error', 'Reset');
          return;
        }

        NotificationManager.success('Success', 'Reset');
      });
    };
  }, [metadataRef, setCustomerMetadataPromise]);
};

export { useSetCustomerMetadata };
