import React from 'react';
import PropTypes from 'prop-types';

const Checkpoint = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.4 8.6C16.4 12.245 9.99999 18 9.99999 18C9.99999 18 3.59999 12.245 3.59999 8.6C3.59999 4.95492 6.46537 2 9.99999 2C13.5346 2 16.4 4.95492 16.4 8.6Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.2 8.39995C13.2 10.1672 11.7673 11.6 9.99999 11.6C8.23268 11.6 6.79999 10.1672 6.79999 8.39995C6.79999 6.63264 8.23268 5.19995 9.99999 5.19995C11.7673 5.19995 13.2 6.63264 13.2 8.39995Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

Checkpoint.propTypes = {
  size: PropTypes.number,
};

Checkpoint.defaultProps = {
  size: 20,
};

export default Checkpoint;
