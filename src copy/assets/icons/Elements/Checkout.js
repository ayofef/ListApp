import React from 'react';
import PropTypes from 'prop-types';

const Checkout = ({ stroke, ...props }) => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M18 10H12M1 6V13C1 14.1046 1.89543 15 3 15H19C20.1046 15 21 14.1046 21 13V6H1ZM1 6V3C1 1.89543 1.89543 1 3 1H19C20.1046 1 21 1.89543 21 3V6H1ZM1 6H21H1Z"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

Checkout.propTypes = {
  stroke: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Checkout.defaultProps = {
  stroke: '#4E40EF',
};

export default Checkout;
