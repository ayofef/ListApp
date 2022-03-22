import React from 'react';
import PropTypes from 'prop-types';
import THEME from '../../constants/theme';

const PlayFill = ({ color, ...props }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M11.596 8.69735L5.233 12.3893C4.693 12.7023 4 12.3233 4 11.6923V4.30835C4 3.67835 4.692 3.29835 5.233 3.61235L11.596 7.30435C11.7188 7.37447 11.8209 7.47583 11.892 7.59816C11.963 7.72048 12.0004 7.8594 12.0004 8.00085C12.0004 8.14229 11.963 8.28122 11.892 8.40354C11.8209 8.52586 11.7188 8.62722 11.596 8.69735Z"
      fill={color}
    />
  </svg>
);

PlayFill.propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
PlayFill.defaultProps = {
  color: THEME.secondaryColors.greenDark,
};

export default PlayFill;
