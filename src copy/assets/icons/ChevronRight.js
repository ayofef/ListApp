import PropTypes from 'prop-types';
import React from 'react';

const ChevronRight = ({ stroke, size, strokeWidth }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 11L9.66667 8L7 5"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
};

ChevronRight.propTypes = {
  stroke: PropTypes.string,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
};
ChevronRight.defaultProps = {
  stroke: '#787F88',
  size: 16,
  strokeWidth: 2,
};

export default ChevronRight;
