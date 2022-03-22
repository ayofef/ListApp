import { useCallback, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { useLoadingIndicator } from '../useLoadingIndicator';
import { GQL_M_ARCHIVE_FLOW, GQL_M_DISABLE_FLOW, GQL_M_ENABLE_FLOW } from '../../utils/queries/flows/mutations';
import { useNotificationManager } from '../useNotificationManager';
import { GET_FLOWS, GQL_Q_GET_ARCHIVED_AUTOMATION } from '../../utils/queries/flows/queries';

const ACTIONS = {
  enableFlow: {
    mutation: GQL_M_ENABLE_FLOW,
    title: 'Enable Flow',
  },
  disableFlow: {
    mutation: GQL_M_DISABLE_FLOW,
    title: 'Disable Flow',
  },
  archiveFlow: {
    mutation: GQL_M_ARCHIVE_FLOW,
    title: 'Archive Flow',
  },
};

const useUpdateFlowStatus = (key) => {
  const { mutation, title } = ACTIONS[key];
  const controllerRef = useRef();
  const [toggleFlowPromise, result] = useMutation(mutation, {
    refetchQueries: [{ query: GQL_Q_GET_ARCHIVED_AUTOMATION }, { query: GET_FLOWS }],
    awaitRefetchQueries: true,
  });

  const handleToggleFlow = useCallback(
    (event, flowId) => {
      controllerRef.current = window.AbortController && new AbortController();

      const signal = controllerRef.current?.signal;
      const options = {
        variables: { flowId },
        ...(signal && { fetchOptions: { signal } }),
      };

      toggleFlowPromise(options).finally(() => {
        controllerRef.current = undefined;
      });
    },
    [toggleFlowPromise]
  );

  useEffect(
    () => () => {
      if (controllerRef.current === undefined) {
        return;
      }

      controllerRef.current.abort();
    },
    []
  );

  useLoadingIndicator(key, result.loading);
  useNotificationManager('error', result.error?.message, title, 5000);

  return [handleToggleFlow, result];
};

const useEnableFlow = () => useUpdateFlowStatus('enableFlow');
const useDisableFlow = () => useUpdateFlowStatus('disableFlow');
const useArchiveFlow = () => useUpdateFlowStatus('archiveFlow');

export { useEnableFlow, useDisableFlow, useArchiveFlow };
