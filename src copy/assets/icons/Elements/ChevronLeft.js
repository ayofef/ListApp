import React from 'react';
import PropTypes from 'prop-types';

const ChevronLeft = ({ stroke, ...props }) => (
  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M5.5 1.5L1.5 6L5.5 10.5" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
  </svg>
);

ChevronLeft.propTypes = {
  stroke: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
ChevronLeft.defaultProps = {
  stroke: '#787f88',
};

export default ChevronLeft;
