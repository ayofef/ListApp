import PropTypes from 'prop-types';
import React from 'react';

const Automation = ({ size }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.995 15.3026C14.0116 15.3026 15.6463 13.6679 15.6463 11.6513C15.6463 9.63474 14.0116 8 11.995 8C9.97849 8 8.34375 9.63474 8.34375 11.6513C8.34375 13.6679 9.97849 15.3026 11.995 15.3026Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2 11.6504H7.4313" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.5684 11.6504H21.9997" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

Automation.propTypes = {
  size: PropTypes.number,
};

Automation.defaultProps = {
  size: 24,
};

export default Automation;
