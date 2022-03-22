import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useFlowEditorContext } from '../../../context';
import { GET_POSSIBLE_CONDITION_PROPERTIES_FOR_STEP } from '../../../../../utils/queries/flows/queries';
import { useElementDataToSave } from '../../AutomationDetails/AutomationStep/fields/hooks/useElementDataToSave';

export const usePossibleConditionProperties = () => {
  const { flowId } = useFlowEditorContext();
  const [{ id: stepId, conditionProperty, unsaved, propertyToEval }, updateDataToSave] = useElementDataToSave();
  const { data, loading } = useQuery(GET_POSSIBLE_CONDITION_PROPERTIES_FOR_STEP, {
    variables: {
      flowId,
      stepId,
      propertyToEval,
    },
    skip: unsaved,
  });
  const [selectedPossibleProperty, setSelectedPossibleProperty] = useState(conditionProperty);

  useEffect(() => {
    setSelectedPossibleProperty(conditionProperty);
  }, [conditionProperty]);

  return {
    possibleProperties: data?.getPossibleConditionPropertiesForStep,
    selectedPossibleProperty,
    setSelectedPossibleProperty,
    updateDataToSave,
    loading,
  };
};
