import React from 'react';
import { string } from 'prop-types';

const PaymentIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 3.33333C1.63181 3.33333 1.33333 3.63181 1.33333 4V12C1.33333 12.3682 1.63181 12.6667 2 12.6667H14C14.3682 12.6667 14.6667 12.3682 14.6667 12V4C14.6667 3.63181 14.3682 3.33333 14 3.33333H2ZM0 4C0 2.89543 0.895431 2 2 2H14C15.1046 2 16 2.89543 16 4V12C16 13.1046 15.1046 14 14 14H2C0.895431 14 0 13.1046 0 12V4Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 6.66667C0 6.29848 0.298477 6 0.666667 6H15.3333C15.7015 6 16 6.29848 16 6.66667C16 7.03486 15.7015 7.33333 15.3333 7.33333H0.666667C0.298477 7.33333 0 7.03486 0 6.66667Z"
      fill="black"
    />
  </svg>
);

PaymentIcon.propTypes = {
  size: string,
};

PaymentIcon.defaultProps = {
  size: '16',
};

export default PaymentIcon;