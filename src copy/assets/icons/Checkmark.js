import React from 'react';
import PropTypes from 'prop-types';
import THEME from '../../constants/theme';

const Checkmark = ({ size = 20, color }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.2 9.34155V10.0039C17.1991 11.5566 16.6963 13.0673 15.7667 14.3108C14.8371 15.5543 13.5304 16.4641 12.0415 16.9043C10.5525 17.3446 8.96125 17.2917 7.50481 16.7536C6.04841 16.2155 4.80495 15.2211 3.95989 13.9186C3.11484 12.6161 2.71345 11.0753 2.81561 9.52608C2.91776 7.97681 3.51799 6.50208 4.52676 5.32182C5.53553 4.14155 6.89881 3.319 8.41325 2.97683C9.9277 2.63466 11.5122 2.79121 12.9304 3.42312M17.2 4.24392L9.99999 11.4511L7.84 9.29115"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

Checkmark.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

Checkmark.defaultProps = {
  size: 20,
  color: THEME.primaryColors.white,
};

export default Checkmark;
