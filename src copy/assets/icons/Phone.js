import React from 'react';
import PropTypes from 'prop-types';

const Phone = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.4 2.8H11.6M6.8 18H13.2C14.0837 18 14.8 17.2837 14.8 16.4V3.6C14.8 2.71634 14.0837 2 13.2 2H6.8C5.91634 2 5.2 2.71634 5.2 3.6V16.4C5.2 17.2837 5.91634 18 6.8 18Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

Phone.propTypes = {
  size: PropTypes.number,
};

Phone.defaultProps = {
  size: 20,
};

export default Phone;
