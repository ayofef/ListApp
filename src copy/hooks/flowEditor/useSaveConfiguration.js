import { useCallback, useEffect, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { isNode } from 'react-flow-renderer';
import debounce from 'lodash/debounce';
import { SAVE_FLOW } from '../../utils/queries/flows/mutations';
import { facadeElementsToSteps } from '../../components/FlowEditor/utils/facades';
import { fieldsUpdatedAfterSave } from './saveConfigUtils';

const SAVE_DEBOUNCE_DELAY = 1500;

export const useSaveConfiguration = ({
  flowId,
  initialState,
  setElements,
  setInitialState,
  setChangesMade,
  selectedElementData,
  elementDataToSave,
  setElementDataToSave,
}) => {
  const [saveConfiguration, { loading }] = useMutation(SAVE_FLOW, {
    onCompleted: (newData) => {
      const steps = newData?.saveConfiguration?.steps;
      if (setChangesMade) {
        setChangesMade(true);
      }
      setElements((elements) =>
        elements.map((el) => {
          if (!isNode(el)) {
            return el;
          }
          const step = steps?.find((s) => s.id === el.id);
          // to avoid inconsistency between sequential saveConfig requests
          // we have elements as source of truth for current elements state and
          // update only those that came from request
          if (step) {
            return {
              ...el,
              data: {
                ...el.data,
                ...fieldsUpdatedAfterSave(step),
              },
            };
          }
          return el;
        })
      );
    },
  });

  useEffect(() => {
    if (!elementDataToSave || (elementDataToSave && !selectedElementData)) {
      setElementDataToSave(selectedElementData);
    }
    if (selectedElementData && elementDataToSave && elementDataToSave.unsaved !== selectedElementData.unsaved) {
      setElementDataToSave({
        ...elementDataToSave,
        ...fieldsUpdatedAfterSave(selectedElementData),
      });
    }
  }, [elementDataToSave, selectedElementData, setElementDataToSave]);

  const [onSaveFlowPromise] = useMutation(SAVE_FLOW, {
    variables: { flowId },
    onCompleted: (data) => {
      setInitialState(data?.saveConfiguration?.initialState);
    },
  });

  const getVariables = useCallback(
    (newData) => {
      const newSteps = facadeElementsToSteps(newData);
      return {
        flowId: flowId,
        steps: newSteps,
        initialState: initialState,
      };
    },
    [flowId, initialState]
  );

  const showErrors = useCallback(
    async (variables) => {
      await saveConfiguration({
        variables,
      });
    },
    [saveConfiguration]
  );

  const onDataSaveAsync = useCallback(
    async (newData) => {
      const variables = getVariables(newData);
      await showErrors(variables);
    },
    [getVariables, showErrors]
  );

  const onDataSave = useMemo(() => {
    return debounce(async (newData) => {
      const variables = getVariables(newData);
      await showErrors(variables);
    }, SAVE_DEBOUNCE_DELAY);
  }, [getVariables, showErrors]);

  return {
    saveConfiguration: onDataSave,
    saveConfigurationAsync: onDataSaveAsync,
    saveFlowPromise: onSaveFlowPromise,
    isDataSaving: loading,
  };
};
