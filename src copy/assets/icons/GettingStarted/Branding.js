import React from 'react';
import { string } from 'prop-types';

const Branding = ({ fill }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.23908 2.66675L6.81481 3.09101L3.56237 6.34346C3.56237 6.34346 3.56236 6.34346 3.56236 6.34347C3.01562 6.89024 3.01563 7.77661 3.56236 8.32335L6.3434 11.1044C6.89017 11.6512 7.77654 11.6512 8.32329 11.1044L12.0472 7.38055C12.0732 7.35453 12.0732 7.3123 12.0472 7.28628L6.04717 1.28628C6.04717 1.28628 6.04717 1.28627 6.04717 1.28627C6.02113 1.26024 5.97893 1.26024 5.95289 1.28627C5.95288 1.28627 5.95288 1.28627 5.95288 1.28628M7.23908 2.66675L5.95288 1.28628M7.23908 2.66675L6.81481 2.24248L5.95289 1.38056M7.23908 2.66675L5.95289 1.38056M5.95288 1.28628C5.92685 1.31232 5.92685 1.35452 5.95288 1.38056M5.95288 1.28628L5.95288 1.38056M5.95289 1.38056C5.95288 1.38056 5.95288 1.38056 5.95288 1.38056M5.95289 1.38056L5.95288 1.38056M7.75762 3.18529L7.33336 2.76103L6.90909 3.18529L3.65665 6.43774C3.65665 6.43774 3.65664 6.43775 3.65664 6.43775C3.16198 6.9324 3.16198 7.73443 3.65664 8.22908C3.65664 8.22908 3.65665 8.22909 3.65665 8.22909L6.43769 11.0101L6.86196 10.5859L6.43769 11.0101C6.93234 11.5048 7.73437 11.5048 8.22902 11.0101L11.4815 7.75768L11.9058 7.33341L11.4815 6.90915L7.75762 3.18529Z"
      fill="none"
      stroke={fill}
      strokeWidth="1.2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.33331 13.9999C1.33331 13.6317 1.63179 13.3333 1.99998 13.3333H14C14.3682 13.3333 14.6666 13.6317 14.6666 13.9999C14.6666 14.3681 14.3682 14.6666 14 14.6666H1.99998C1.63179 14.6666 1.33331 14.3681 1.33331 13.9999Z"
      fill={fill}
    />
    <path
      d="M13.3333 11C13.3333 11.5523 12.8856 12 12.3333 12C11.781 12 11.3333 11.5523 11.3333 11C11.3333 10.6405 11.7571 9.76021 12.0529 9.18961C12.1726 8.95861 12.494 8.95861 12.6137 9.18961C12.9095 9.76021 13.3333 10.6405 13.3333 11Z"
      fill={fill}
    />
  </svg>
);

Branding.propTypes = {
  fill: string,
};

Branding.defaultProps = {
  fill: '#4E40EF',
};

export default Branding;