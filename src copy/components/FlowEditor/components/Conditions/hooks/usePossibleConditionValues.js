import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useFlowEditorContext } from '../../../context';
import { GET_POSSIBLE_CONDITION_VALUES_FOR_STEP } from '../../../../../utils/queries/flows/queries';

export const usePossibleConditionValues = ({ stepId, targetId }) => {
  const { flowId, findElementDataById } = useFlowEditorContext();
  const { data } = useQuery(GET_POSSIBLE_CONDITION_VALUES_FOR_STEP, {
    variables: {
      flowId,
      stepId,
    },
    fetchPolicy: 'no-cache',
  });

  const conditionElement = findElementDataById(stepId);

  const [condition, setCondition] = useState({});
  useEffect(() => {
    const editedCondition = conditionElement?.conditions?.find((c) => c?.nextStepId === targetId);
    setCondition(editedCondition || {});
  }, [conditionElement?.conditions, targetId]);

  return {
    possibleValues: data?.getPossibleConditionValuesForStep,
    condition,
    setCondition,
    conditionElement,
  };
};
