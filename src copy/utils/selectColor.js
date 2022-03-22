import THEME from '../constants/theme';

export const selectColor = (nodeData, group, isText) => {
  if (nodeData?.icon?.url) {
    return isText ? THEME.primaryColors.black : 'transparent';
  }
  switch (group) {
    case 'locked':
      return THEME.greyColors.grey1;
    case 'ungrouped':
      return THEME.secondaryColors.greenDark;
    case 'conditions':
      return THEME.secondaryColors.teal;
    case 'actions':
      return THEME.secondaryColors.salmon;
    case 'engage':
      return THEME.secondaryColors.warnYellow;
    case 'triggers':
      return THEME.primaryColors.primary;
    default:
      return THEME.secondaryColors.warnYellow;
  }
};
