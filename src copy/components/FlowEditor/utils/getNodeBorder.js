import THEME from '../../../constants/theme';

const NODE_BORDER = {
  Actions: '1px solid #CA5AFF',
  Triggers: '1px solid #FF5A87',
  Tests: '2px solid #4E40EF',
  Default: `1px solid ${THEME.greyColors.grey5}`,
  Error: `1px solid ${THEME.secondaryColors.nodeError}`,
};

export const getNodeBorder = (nodeId, isValid, isConnectable, selectedElementId, hoverElementId, isAutomationTest) => {
  if (isConnectable) {
    return NODE_BORDER.Actions;
  }
  if (selectedElementId === nodeId) {
    if (isAutomationTest) {
      return NODE_BORDER.Tests;
    }
    return NODE_BORDER.Actions;
  }
  if (hoverElementId === nodeId) {
    return NODE_BORDER.Actions;
  }
  if (!isValid) {
    return NODE_BORDER.Error;
  }
  return NODE_BORDER.Default;
};
