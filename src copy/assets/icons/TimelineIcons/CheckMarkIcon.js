import React from 'react';
import { string } from 'prop-types';

const CheckMarkIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 7.55554L7.55556 10.6666L12.4444 5.33331"
      stroke="#4E40EF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

CheckMarkIcon.propTypes = {
  size: string,
};

CheckMarkIcon.defaultProps = {
  size: '16',
};

export default CheckMarkIcon;
