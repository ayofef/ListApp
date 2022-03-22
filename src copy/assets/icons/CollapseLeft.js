import React from 'react';
import PropTypes from 'prop-types';

const CollapseLeft = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.49992 3.3335C2.03968 3.3335 1.66658 3.70659 1.66658 4.16683V15.8335C1.66658 16.2937 2.03968 16.6668 2.49992 16.6668C2.96016 16.6668 3.33325 16.2937 3.33325 15.8335V4.16683C3.33325 3.70659 2.96016 3.3335 2.49992 3.3335Z"
      fill="#787F88"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.2559 5.24408C11.9305 4.91864 11.4028 4.91864 11.0774 5.24408L6.91074 9.41074C6.58531 9.73618 6.58531 10.2638 6.91074 10.5893L11.0774 14.7559C11.4028 15.0814 11.9305 15.0814 12.2559 14.7559C12.5814 14.4305 12.5814 13.9028 12.2559 13.5774L8.67851 10L12.2559 6.42259C12.5814 6.09715 12.5814 5.56951 12.2559 5.24408Z"
      fill="#787F88"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.3333 9.99984C18.3333 9.5396 17.9602 9.1665 17.4999 9.1665H7.49992C7.03968 9.1665 6.66658 9.5396 6.66658 9.99984C6.66658 10.4601 7.03968 10.8332 7.49992 10.8332H17.4999C17.9602 10.8332 18.3333 10.4601 18.3333 9.99984Z"
      fill="#787F88"
    />
  </svg>
);

CollapseLeft.propTypes = {
  size: PropTypes.number,
};

CollapseLeft.defaultProps = {
  size: 20,
};

export default CollapseLeft;
