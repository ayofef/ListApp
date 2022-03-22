import PropTypes from 'prop-types';
import React from 'react';

const Collapsable = ({ fill }) => {
  return (
    <svg
      className="collapsable"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.75"
        y="-0.75"
        width="18.5"
        height="18.5"
        rx="6.75"
        transform="matrix(-1 0 0 1 21.5 3)"
        stroke={fill}
        strokeWidth="1.5"
      />
      <path d="M8.41816 15.4766V7.52335" stroke={fill} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
      <path
        d="M12.3947 13.5879L10.307 11.5002L12.3947 9.41245"
        stroke={fill}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path d="M10.4064 11.5H16.3713" stroke={fill} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
    </svg>
  );
};

Collapsable.propTypes = {
  fill: PropTypes.string,
};
Collapsable.defaultProps = {
  fill: '#C1C3C6',
};
export default Collapsable;
