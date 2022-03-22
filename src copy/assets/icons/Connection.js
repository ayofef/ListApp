import React from 'react';
import { number } from 'prop-types';

const Connection = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.99587 12.7515C11.6763 12.7515 13.0386 11.3892 13.0386 9.70876C13.0386 8.0283 11.6763 6.66602 9.99587 6.66602C8.31541 6.66602 6.95312 8.0283 6.95312 9.70876C6.95312 11.3892 8.31541 12.7515 9.99587 12.7515Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M1.6665 9.70898H6.19259" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.8071 9.70898H18.3332" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

Connection.propTypes = {
  size: number,
};

Connection.defaultProps = {
  size: 20,
};

export default Connection;
