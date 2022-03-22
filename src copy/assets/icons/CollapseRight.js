import React from 'react';
import PropTypes from 'prop-types';

const CollapseRight = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.5 3.3335C17.9603 3.3335 18.3334 3.70659 18.3334 4.16683V15.8335C18.3334 16.2937 17.9603 16.6668 17.5 16.6668C17.0398 16.6668 16.6667 16.2937 16.6667 15.8335V4.16683C16.6667 3.70659 17.0398 3.3335 17.5 3.3335Z"
      fill="#787F88"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.74408 5.24408C8.06951 4.91864 8.59715 4.91864 8.92259 5.24408L13.0893 9.41074C13.4147 9.73618 13.4147 10.2638 13.0893 10.5893L8.92259 14.7559C8.59715 15.0814 8.06951 15.0814 7.74408 14.7559C7.41864 14.4305 7.41864 13.9028 7.74408 13.5774L11.3215 10L7.74408 6.42259C7.41864 6.09715 7.41864 5.56951 7.74408 5.24408Z"
      fill="#787F88"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.66669 9.99984C1.66669 9.5396 2.03978 9.1665 2.50002 9.1665H12.5C12.9603 9.1665 13.3334 9.5396 13.3334 9.99984C13.3334 10.4601 12.9603 10.8332 12.5 10.8332H2.50002C2.03978 10.8332 1.66669 10.4601 1.66669 9.99984Z"
      fill="#787F88"
    />
  </svg>
);

CollapseRight.propTypes = {
  size: PropTypes.number,
};

CollapseRight.defaultProps = {
  size: 20,
};

export default CollapseRight;
