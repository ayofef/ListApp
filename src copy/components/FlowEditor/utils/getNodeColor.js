import THEME from '../../../constants/theme';

const NODE_COLOR_MAP = {
  Actions: '#CA5AFF',
  Triggers: '#FF5A87',
  Tests: '#4E40EF',
};

export const getNodeColorFromGroup = (group) => {
  return NODE_COLOR_MAP[group] ?? '#000000';
};

export const getNodeBorderColor = (
  nodeId,
  isValid,
  isConnectable,
  selectedElementId,
  hoverElementId,
  isAutomationTest
) => {
  if (isConnectable) {
    return NODE_COLOR_MAP.Actions;
  }
  if (selectedElementId === nodeId) {
    if (isAutomationTest) {
      return NODE_COLOR_MAP.Tests;
    }
    return NODE_COLOR_MAP.Actions;
  }
  if (hoverElementId === nodeId) {
    return NODE_COLOR_MAP.Actions;
  }
  if (!isValid) {
    return THEME.secondaryColors.invalid;
  }
  return 'transparent';
};
