import React from 'react';
import PropTypes from 'prop-types';

const Copy = ({ size = 20, fill, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M7.6 6.8H15.6V5.2H7.6V6.8ZM16.4 7.6V15.6H18V7.6H16.4ZM15.6 16.4H7.6V18H15.6V16.4ZM6.8 15.6V7.6H5.2V15.6H6.8ZM7.6 16.4C7.15818 16.4 6.8 16.0418 6.8 15.6H5.2C5.2 16.9255 6.27452 18 7.6 18V16.4ZM16.4 15.6C16.4 16.0418 16.0418 16.4 15.6 16.4V18C16.9255 18 18 16.9255 18 15.6H16.4ZM15.6 6.8C16.0418 6.8 16.4 7.15818 16.4 7.6H18C18 6.27452 16.9255 5.2 15.6 5.2V6.8ZM7.6 5.2C6.27452 5.2 5.2 6.27452 5.2 7.6H6.8C6.8 7.15818 7.15818 6.8 7.6 6.8V5.2ZM4.4 3.6H12.4V2H4.4V3.6ZM3.6 12.4V4.4H2V12.4H3.6ZM5.2 13.2H4.4V14.8H5.2V13.2ZM13.2 4.4V5.2H14.8V4.4H13.2ZM2 12.4C2 13.7255 3.07452 14.8 4.4 14.8V13.2C3.95818 13.2 3.6 12.8418 3.6 12.4H2ZM12.4 3.6C12.8418 3.6 13.2 3.95818 13.2 4.4H14.8C14.8 3.07452 13.7255 2 12.4 2V3.6ZM4.4 2C3.07452 2 2 3.07452 2 4.4H3.6C3.6 3.95818 3.95818 3.6 4.4 3.6V2Z"
      fill={fill}
    />
  </svg>
);

Copy.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

Copy.defaultProps = {
  size: 20,
  fill: 'white',
};

export default Copy;
