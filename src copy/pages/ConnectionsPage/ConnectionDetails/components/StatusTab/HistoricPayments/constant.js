import THEME from '../../../../../../constants/theme';

const TITLE = 'Payment History';
const DESC = 'Click import to pull in historical payments to get a holistic picture of your past payment performance.';

const IMPORT_STATUS_DICTIONARY = {
  default: 'DEFAULT',
  importing: 'IN_PROGRESS',
  completed: 'COMPLETED',
  error: 'ERROR',
};

const STATUS_MAP = {
  [IMPORT_STATUS_DICTIONARY.default]: {
    label: 'Import',
    color: 'primary',
    showButtonIcon: true,
    progressColor: {
      main: THEME.greyColors.grey5,
      pseudoColor: THEME.greyColors.grey8,
    },
  },
  [IMPORT_STATUS_DICTIONARY.importing]: {
    label: 'importing',
    color: 'secondary',
    progressColor: {
      main: THEME.greyColors.grey5,
      pseudoColor: THEME.primaryColors.primary,
    },
  },
  [IMPORT_STATUS_DICTIONARY.completed]: {
    label: 'completed',
    color: 'secondary',
    progressColor: {
      main: THEME.greyColors.grey8,
      pseudoColor: THEME.greyColors.grey8,
    },
  },
  [IMPORT_STATUS_DICTIONARY.error]: {
    label: 'import',
    color: 'primary',
    progressColor: {
      main: THEME.statusColors.failed,
      pseudoColor: THEME.greyColors.grey8,
    },
  },
};

const LABEL_COLOR_MAP = {
  [IMPORT_STATUS_DICTIONARY.default]: THEME.greyColors.grey8,
  [IMPORT_STATUS_DICTIONARY.importing]: THEME.primaryColors.primary,
  [IMPORT_STATUS_DICTIONARY.completed]: THEME.greyColors.grey1,
};

const MAX_MOCK_PROGRESS = 96;

const transformProgressValue = (value) => (value > 0 && value < MAX_MOCK_PROGRESS ? value + 5 : value);

export {
  STATUS_MAP,
  IMPORT_STATUS_DICTIONARY,
  DESC,
  TITLE,
  MAX_MOCK_PROGRESS,
  transformProgressValue,
  LABEL_COLOR_MAP,
};
