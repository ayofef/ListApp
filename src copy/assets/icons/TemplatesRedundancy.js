import React from 'react';
import { number, string } from 'prop-types';
import THEME from '../../constants/theme';

const TemplatesRedundancy = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.99992 4.66699C2.36811 4.66699 2.66659 4.96547 2.66659 5.33366V13.3337H13.3333V5.33366C13.3333 4.96547 13.6317 4.66699 13.9999 4.66699C14.3681 4.66699 14.6666 4.96547 14.6666 5.33366V14.0003C14.6666 14.3685 14.3681 14.667 13.9999 14.667H1.99992C1.63173 14.667 1.33325 14.3685 1.33325 14.0003V5.33366C1.33325 4.96547 1.63173 4.66699 1.99992 4.66699Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 1.99967C0 1.63148 0.298477 1.33301 0.666667 1.33301H15.3333C15.7015 1.33301 16 1.63148 16 1.99967V5.33301C16 5.7012 15.7015 5.99967 15.3333 5.99967H0.666667C0.298477 5.99967 0 5.7012 0 5.33301V1.99967ZM1.33333 2.66634V4.66634H14.6667V2.66634H1.33333Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 7.99967C6 7.63148 6.29848 7.33301 6.66667 7.33301H9.33333C9.70152 7.33301 10 7.63148 10 7.99967C10 8.36786 9.70152 8.66634 9.33333 8.66634H6.66667C6.29848 8.66634 6 8.36786 6 7.99967Z"
      fill={color}
    />
  </svg>
);

TemplatesRedundancy.propTypes = {
  size: number,
  color: string,
};

TemplatesRedundancy.defaultProps = {
  size: 16,
  color: THEME.greyColors.grey17,
};

export default TemplatesRedundancy;
