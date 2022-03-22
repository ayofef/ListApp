import React from 'react';
import { number, string } from 'prop-types';

const Plus = ({ size, fill }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="14.6665" y="8" width="2.66667" height="16" rx="1" fill={fill} />
    <rect x="8" y="17.334" width="2.66667" height="16" rx="1" transform="rotate(-90 8 17.334)" fill={fill} />
  </svg>
);

Plus.propTypes = {
  size: number,
  fill: string,
};

Plus.defaultProps = {
  size: 32,
  fill: '#787F88',
};

export default Plus;
