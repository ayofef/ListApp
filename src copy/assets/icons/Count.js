import React from 'react';
import PropTypes from 'prop-types';

const Count = ({ fill, size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_1699_195621)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.99967 1.33398C3.36786 1.33398 3.66634 1.63246 3.66634 2.00065V14.0007C3.66634 14.3688 3.36786 14.6673 2.99967 14.6673C2.63148 14.6673 2.33301 14.3688 2.33301 14.0007V2.00065C2.33301 1.63246 2.63148 1.33398 2.99967 1.33398Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.33366 1.33398C6.70185 1.33398 7.00033 1.63246 7.00033 2.00065V14.0007C7.00033 14.3688 6.70185 14.6673 6.33366 14.6673C5.96547 14.6673 5.66699 14.3688 5.66699 14.0007V2.00065C5.66699 1.63246 5.96547 1.33398 6.33366 1.33398Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.66667 1.33398C10.0349 1.33398 10.3333 1.63246 10.3333 2.00065V14.0007C10.3333 14.3688 10.0349 14.6673 9.66667 14.6673C9.29848 14.6673 9 14.3688 9 14.0007V2.00065C9 1.63246 9.29848 1.33398 9.66667 1.33398Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.9997 1.33398C13.3679 1.33398 13.6663 1.63246 13.6663 2.00065V14.0007C13.6663 14.3688 13.3679 14.6673 12.9997 14.6673C12.6315 14.6673 12.333 14.3688 12.333 14.0007V2.00065C12.333 1.63246 12.6315 1.33398 12.9997 1.33398Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.0403287 10.8941C-0.0854976 10.5481 0.0930066 10.1656 0.439029 10.0397L15.1057 4.70641C15.4517 4.58059 15.8342 4.75909 15.9601 5.10511C16.0859 5.45114 15.9074 5.83365 15.5614 5.95947L0.894686 11.2928C0.548664 11.4186 0.166155 11.2401 0.0403287 10.8941Z"
        fill={fill}
      />
    </g>
    <defs>
      <clipPath id="clip0_1699_195621">
        <rect width="16" height="16" fill={fill} />
      </clipPath>
    </defs>
  </svg>
);

Count.propTypes = {
  fill: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Count.defaultProps = {
  fill: 'white',
  size: 16,
};

export default Count;
