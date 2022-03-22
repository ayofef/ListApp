import React from 'react';
import PropTypes from 'prop-types';

const Flow = ({ stroke, size }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="19" width="7" height="2" rx="1" fill={stroke} />
    <rect x="26" y="19" width="7" height="2" rx="1" fill={stroke} />
    <circle cx="20" cy="20" r="7" stroke={stroke} strokeWidth="2" />
    <circle cx="20" cy="20" r="2" stroke={stroke} strokeWidth="2" />
  </svg>
);

Flow.propTypes = {
  size: PropTypes.string,
  stroke: PropTypes.string,
};

Flow.defaultProps = {
  size: '40',
  stroke: '#787f88',
};

export default Flow;
