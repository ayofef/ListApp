import PropTypes from 'prop-types';
import React from 'react';

const ToggleOff = ({ fill }) => {
  return (
    <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 13H15C18.3137 13 21 10.3137 21 7C21 3.68629 18.3137 1 15 1H7M7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

ToggleOff.propTypes = {
  fill: PropTypes.string,
};

ToggleOff.defaultProps = {
  fill: '#787F88',
};

export default ToggleOff;
