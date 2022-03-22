import React from 'react';
import { string } from 'prop-types';

const PaymentIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="8" fill="#4E40EF" />
    <g clipPath="url(#clip0)">
      <path
        d="M7.99995 9.77778C8.98179 9.77778 9.77772 8.98185 9.77772 8.00001C9.77772 7.01817 8.98179 6.22223 7.99995 6.22223C7.01811 6.22223 6.22217 7.01817 6.22217 8.00001C6.22217 8.98185 7.01811 9.77778 7.99995 9.77778Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.1333 8H5.77774" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.2266 8H12.871" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="10.6667" height="10.6667" fill="white" transform="translate(2.6665 2.66669)" />
      </clipPath>
    </defs>
  </svg>
);

PaymentIcon.propTypes = {
  size: string,
};

PaymentIcon.defaultProps = {
  size: '16',
};

export default PaymentIcon;
