import PropTypes from 'prop-types';

// Settings
const PROPTYPES = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  cell: PropTypes.shape({
    column: PropTypes.shape({
      Header: PropTypes.string,
    }),
  }).isRequired,
};

const FORMATS = {
  sameDay: 'DD MMM YYYY',
  nextDay: 'DD MMM YYYY',
  nextWeek: 'DD MMM YYYY',
  lastDay: 'DD MMM YYYY',
  lastWeek: 'DD MMM YYYY',
  sameElse: 'DD MMM YYYY',
};

const MAX = 5;

const STATUS_UI_LABEL_MAP = {
  NEEDS_3D_SECURE: 'Needs 3D Secure',
};

const transformStatusUiLabel = (label) => {
  if (typeof label !== 'string') return label;

  return label.replace(/_/g, ' ');
};

export { MAX, FORMATS, PROPTYPES, STATUS_UI_LABEL_MAP, transformStatusUiLabel };
