import { useFlowEditorContext } from '../../../context';
import { getNodeBorderColor, getNodeColorFromGroup } from '../../../utils/getNodeColor';
import { isNodeConnectable } from '../../../utils/isNodeConnectable';
import { getNodeBorder } from '../../../utils/getNodeBorder';

export const useNodeProperties = ({ id, group, isValid }) => {
  const {
    connectingNodeData,
    elements,
    selectedElementId,
    hoverElementId,
    isValidateOn,
    isAutomationTest,
  } = useFlowEditorContext();

  const _isValid = !isValidateOn || isValid;

  const highlightColor = getNodeColorFromGroup(group);
  const nodeConnectable = connectingNodeData && isNodeConnectable(connectingNodeData, id, elements);
  const borderColor = getNodeBorderColor(
    id,
    _isValid,
    nodeConnectable,
    selectedElementId,
    hoverElementId,
    isAutomationTest
  );

  const border = getNodeBorder(id, _isValid, nodeConnectable, selectedElementId, hoverElementId, isAutomationTest);

  const isHover = hoverElementId === id;
  const isSelected = selectedElementId === id;

  const isHighlighted = isHover || isSelected;

  const occupiedHandleIds = elements.filter((el) => el.source === id).map((el) => el.sourceHandle ?? 'next');

  return {
    highlightColor,
    nodeConnectable,
    borderColor,
    border,
    isHover,
    isHighlighted,
    occupiedHandleIds,
    isValid: _isValid,
  };
};
