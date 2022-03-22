import React from 'react';
import PropTypes from 'prop-types';

const BackTime = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.79999 7.65198C4.36521 5.36676 6.02434 2.7998 9.99999 2.7998C13.9756 2.7998 17.2 6.02415 17.2 9.99981C17.2 13.9755 13.9756 17.1998 9.99999 17.1998C6.02434 17.1998 2.79999 13.9755 2.79999 9.99981"
      stroke="white"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M2.79999 3.89551V7.65203H6.55651"
      stroke="white"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.72 7.11987V11.4399H7.83998"
      stroke="white"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

BackTime.propTypes = {
  size: PropTypes.number,
};

BackTime.defaultProps = {
  size: 20,
};

export default BackTime;
