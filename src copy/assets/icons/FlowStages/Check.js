import PropTypes from 'prop-types';
import React from 'react';

const Check = ({ fill }) => {
  return (
    <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 7.66667L11.6667 17L26.3333 1"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="check-path"
      />
    </svg>
  );
};

Check.propTypes = {
  fill: PropTypes.string,
};
Check.defaultProps = {
  fill: '#787F88',
};

export default Check;
