import React from 'react';
import PropTypes from 'prop-types';

const ChevronRight = ({ stroke, ...props }) => (
  <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M1 7L3.66667 4L1 1" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
  </svg>
);

ChevronRight.propTypes = {
  stroke: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
ChevronRight.defaultProps = {
  stroke: '#787f88',
};

export default ChevronRight;
