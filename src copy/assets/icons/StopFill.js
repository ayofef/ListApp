import React from 'react';
import PropTypes from 'prop-types';
import THEME from '../../constants/theme';

const StopFill = ({ color, ...props }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M5 3.5H11C11.3978 3.5 11.7794 3.65804 12.0607 3.93934C12.342 4.22064 12.5 4.60218 12.5 5V11C12.5 11.3978 12.342 11.7794 12.0607 12.0607C11.7794 12.342 11.3978 12.5 11 12.5H5C4.60218 12.5 4.22064 12.342 3.93934 12.0607C3.65804 11.7794 3.5 11.3978 3.5 11V5C3.5 4.60218 3.65804 4.22064 3.93934 3.93934C4.22064 3.65804 4.60218 3.5 5 3.5Z"
      fill={color}
    />
  </svg>
);

StopFill.propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
StopFill.defaultProps = {
  color: THEME.statusColors.failed,
};

export default StopFill;