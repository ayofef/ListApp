import React from 'react';
import PropTypes from 'prop-types';

const CloseIcon = ({ stroke, ...restProps }) => (
  <svg
    width="48"
    stroke={stroke}
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <circle cx="24" cy="24" r="23.5" fill="transparent" stroke="transparent" />
    <path
      d="M16.6958 16.6953L31.3045 31.304"
      stroke={stroke}
      strokeWidth="3"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M16.6958 31.304L31.3045 16.6953"
      stroke={stroke}
      strokeWidth="3"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
  </svg>
);

CloseIcon.propTypes = {
  stroke: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
CloseIcon.defaultProps = {
  stroke: '2',
};
export default CloseIcon;
