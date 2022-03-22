import React from 'react';
import PropTypes from 'prop-types';

const Forms = ({ stroke, ...props }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M8 18H16C19.3137 18 22 15.3137 22 12C22 8.68629 19.3137 6 16 6H8M8 18C4.68629 18 2 15.3137 2 12C2 8.68629 4.68629 6 8 6M8 18C11.3137 18 14 15.3137 14 12C14 8.68629 11.3137 6 8 6"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

Forms.propTypes = {
  stroke: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Forms.defaultProps = {
  stroke: '#787F88',
};

export default Forms;
