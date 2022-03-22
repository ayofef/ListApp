import { useSelectedElement } from './useSelectedElement';
import { useFlowEditorContext } from '../../../../../context';
import { useGetEditorProperties } from '../../../../../../../hooks/useGetEditorProperties';

const useFlowPropertiesList = (matchingTypes = [], fetchPolicy) => {
  const { flowId } = useFlowEditorContext();
  const [{ id: stepId }] = useSelectedElement();

  return useGetEditorProperties({ flowId, stepId }, matchingTypes, fetchPolicy);
};

export { useFlowPropertiesList };
