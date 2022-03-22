import DotIcon from '../../../../../../assets/icons/TimelineIcons/DotIcon';
import THEME from '../../../../../../constants/theme';

const TIMELINE_STATUS_MAP = {
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETE: 'COMPLETE',
  FAILED: 'FAILED',
  NOT_STARTED: 'NOT_STARTED',
};

const getStatusColor = (status) => {
  switch (status) {
    case TIMELINE_STATUS_MAP.IN_PROGRESS:
      return THEME.primaryColors.white;
    case TIMELINE_STATUS_MAP.COMPLETE:
      return THEME.secondaryColors.greenDark;
    case TIMELINE_STATUS_MAP.FAILED:
      return THEME.secondaryColors.nodeError;
    case TIMELINE_STATUS_MAP.NOT_STARTED:
      return THEME.greyColors.grey8;
    default:
      return '#C1C3C6';
  }
};

const getIconOptions = (status) => {
  const options = {
    GENERIC: {
      iconSize: 7,
      icon: DotIcon,
    },
    AUTOMATION: {
      iconSize: 16,
      icon: DotIcon,
    },
    ISSUE: {
      iconSize: 16,
      icon: DotIcon,
    },
    COMMENT: {
      iconSize: 16,
      icon: DotIcon,
    },
    ATTACHMENT: {
      iconSize: 7,
      icon: DotIcon,
    },
  };
  return options[status] || options.GENERIC;
};

export { getIconOptions, getStatusColor, TIMELINE_STATUS_MAP };
