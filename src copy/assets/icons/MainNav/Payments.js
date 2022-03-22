import React from 'react';
import PropTypes from 'prop-types';

const Payments = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 7.2627C2.44772 7.2627 2 7.71041 2 8.2627V20.2627C2 20.815 2.44772 21.2627 3 21.2627H21C21.5523 21.2627 22 20.815 22 20.2627V8.2627C22 7.71041 21.5523 7.2627 21 7.2627H3ZM0 8.2627C0 6.60584 1.34315 5.2627 3 5.2627H21C22.6569 5.2627 24 6.60584 24 8.2627V20.2627C24 21.9195 22.6569 23.2627 21 23.2627H3C1.34315 23.2627 0 21.9195 0 20.2627V8.2627Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.79237 6.219C2.6309 5.69085 2.92815 5.1318 3.4563 4.97032L16.8446 0.87712C18.429 0.392703 20.1062 1.28446 20.5906 2.86892L20.5936 2.87878L21.4079 5.64413C21.564 6.17392 21.261 6.72987 20.7312 6.8859C20.2014 7.04192 19.6454 6.73892 19.4894 6.20913L18.6767 3.44959C18.5136 2.92398 17.9561 2.62867 17.4293 2.78973L4.04105 6.88293C3.5129 7.04441 2.95384 6.74715 2.79237 6.219Z"
      fill={fill}
    />
  </svg>
);
Payments.propTypes = {
  fill: PropTypes.string,
};
Payments.defaultProps = {
  fill: '#6A6A6A',
};
export default Payments;
