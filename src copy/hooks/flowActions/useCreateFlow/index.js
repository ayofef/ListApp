import { useCallback, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import { GET_FLOW_LIST } from '../../../utils/queries/flows/flowsQueries';
import { useLoadingIndicator } from '../../useLoadingIndicator';
import { updateCache } from './updateCache';
import { createFlowFromTemplate, createFlow, duplicateFlow } from './settings';

const useCreateFlow = ({ key, mutation, createVariables, title, getNewFlow }) => {
  const { t } = useTranslation();
  const controllerRef = useRef();
  const history = useHistory();
  const [createFlowPromise, result] = useMutation(mutation, {
    update: updateCache(getNewFlow),
    ...(key === createFlowFromTemplate.key && { context: { skipGlobalHandling: true } }),
    refetchQueries: [{ query: GET_FLOW_LIST }],
  });

  const handleError = useCallback(
    (message) => {
      NotificationManager.error(message, t(title), 5000);
    },
    [title, t]
  );

  const handleCreateFlow = useCallback(
    (event, id, addToFlowId, skipRedirect, callbackFn) => {
      controllerRef.current = window.AbortController && new AbortController();
      const signal = controllerRef.current?.signal;
      const variables = createVariables(id, addToFlowId);
      const options = {
        ...(variables && { variables }),
        ...(signal && { fetchOptions: { signal } }),
      };
      createFlowPromise(options)
        .then(({ errors, data }) => {
          if (errors) {
            return;
          }
          const flowId = getNewFlow(data)?.id;
          if (!flowId) {
            handleError('Flow Id does not exist');
            return;
          }
          if (!skipRedirect) {
            history.replace({
              pathname: `/automations/${flowId}/editor`,
            });
          }
        })
        .finally(() => {
          if (typeof callbackFn === 'function') {
            callbackFn();
          }
          controllerRef.current = undefined;
        });
    },
    [createVariables, createFlowPromise, getNewFlow, history, handleError]
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
  return [handleCreateFlow, result];
};

const useCreateFlowFromTemplate = () => useCreateFlow(createFlowFromTemplate);
const useCreateNewFlow = () => useCreateFlow(createFlow);
const useDuplicateFlow = () => useCreateFlow(duplicateFlow);

export { useCreateFlowFromTemplate, useCreateNewFlow, useDuplicateFlow };
