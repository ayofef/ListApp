import React from 'react';
import { number, string } from 'prop-types';
import THEME from '../../constants/theme';

const ArrowRight = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 11L9.66667 8L7 5" stroke={color} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
  </svg>
);

ArrowRight.propTypes = {
  size: number,
  color: string,
};

ArrowRight.defaultProps = {
  size: 16,
  color: THEME.primaryColors.primary,
};

export default ArrowRight;
