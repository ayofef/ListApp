import THEME from '../../../constants/theme';

export const getEdgeColor = (edge, selectedElementId, hoverElementId, isAutomationTest, edgeError) => {
  if (edgeError) {
    return THEME.secondaryColors.nodeError;
  }
  if (isAutomationTest) {
    return '#C1C3C6';
  }
  const { source, id } = edge;
  if (source === selectedElementId || source === hoverElementId || selectedElementId === id || id === hoverElementId) {
    return '#3023C8';
  }
  return '#C1C3C6';
};
