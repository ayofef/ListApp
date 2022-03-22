import React from 'react';
import { number, string } from 'prop-types';
import THEME from '../../constants/theme';

const LinkOut = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.8125 8.49922L16.0125 8.49922L16.0125 15.6992"
      stroke={color}
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <line
      x1="15"
      y1="9.91421"
      x2="7.41421"
      y2="17.5"
      stroke={color}
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
  </svg>
);

LinkOut.propTypes = {
  size: number,
  color: string,
};

LinkOut.defaultProps = {
  size: 24,
  color: THEME.primaryColors.primary,
};

export default LinkOut;
