import React from 'react';
import PropTypes from 'prop-types';

const Lock = ({ size, fill }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
      <path d="M0 0H16V16H0V0Z" fill="white" />
    </mask>
    <g mask="url(#mask0)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.66667 6.66667V5.33333C4.66667 3.49238 6.15905 2 8 2C9.84095 2 11.3333 3.49238 11.3333 5.33333V6.66667H12C12.7364 6.66667 13.3333 7.26362 13.3333 8V12C13.3333 12.7364 12.7364 13.3333 12 13.3333H4C3.26362 13.3333 2.66667 12.7364 2.66667 12V8C2.66667 7.26362 3.26362 6.66667 4 6.66667H4.66667ZM8 3.33333C6.89543 3.33333 6 4.22876 6 5.33333V6.66667H10V5.33333C10 4.22876 9.10457 3.33333 8 3.33333Z"
        fill={fill}
      />
    </g>
  </svg>
);

Lock.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

Lock.defaultProps = {
  size: 16,
  fill: '#787F88',
};

export default Lock;
