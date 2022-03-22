import PropTypes from 'prop-types';
import React from 'react';

const Check = ({ fill }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 11.3333L11.3333 16L18.6667 8"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

Check.propTypes = {
  fill: PropTypes.string,
};

Check.defaultProps = {
  fill: '#C1C3C6',
};

export default Check;
