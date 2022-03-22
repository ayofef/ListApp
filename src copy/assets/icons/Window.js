import React from 'react';
import { string } from 'prop-types';

const Window = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0)">
      <path
        d="M1.2002 7.59981H18.8002H1.2002ZM3.3602 17.1998H16.6402C17.8332 17.1998 18.8002 16.2328 18.8002 15.0398V4.9598C18.8002 3.76687 17.8332 2.7998 16.6402 2.7998H3.3602C2.16726 2.7998 1.2002 3.76687 1.2002 4.9598V15.0398C1.2002 16.2328 2.16726 17.1998 3.3602 17.1998Z"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M3.90078 5.1999C3.90078 5.36558 3.76646 5.4999 3.60078 5.4999C3.4351 5.4999 3.30078 5.36558 3.30078 5.1999C3.30078 5.03422 3.4351 4.8999 3.60078 4.8999C3.76646 4.8999 3.90078 5.03422 3.90078 5.1999Z"
        fill="white"
        stroke="white"
      />
      <path
        d="M6.3002 5.1999C6.3002 5.36558 6.16588 5.4999 6.0002 5.4999C5.83451 5.4999 5.7002 5.36558 5.7002 5.1999C5.7002 5.03422 5.83451 4.8999 6.0002 4.8999C6.16588 4.8999 6.3002 5.03422 6.3002 5.1999Z"
        fill="white"
        stroke="white"
      />
      <path
        d="M9.20059 5.1999C9.20059 5.64173 8.84243 5.9999 8.40059 5.9999C7.95876 5.9999 7.60059 5.64173 7.60059 5.1999C7.60059 4.75808 7.95876 4.3999 8.40059 4.3999C8.84243 4.3999 9.20059 4.75808 9.20059 5.1999Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="19.2" height="19.2" fill="white" transform="translate(0.400391 0.399902)" />
      </clipPath>
    </defs>
  </svg>
);

Window.propTypes = {
  size: string,
};

Window.defaultProps = {
  size: 20,
};

export default Window;
