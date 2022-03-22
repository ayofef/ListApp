import React from 'react';
import { number, string } from 'prop-types';

const ArrowBack = ({ size, stroke, className }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 12H2.5" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" />
    <path d="M12.25 21.75L2.5 12L12.25 2.25" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" />
  </svg>
);

ArrowBack.propTypes = {
  size: number,
  stroke: string,
  className: string,
};

ArrowBack.defaultProps = {
  size: 24,
  stroke: '#000',
  className: '',
};

export default ArrowBack;
