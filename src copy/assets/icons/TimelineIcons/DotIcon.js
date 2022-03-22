import React from 'react';
import { string, number } from 'prop-types';

const DotIcon = ({ fill, size }) => (
  <svg width={size} height={size} viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="3.5" cy="3.5" r="3.5" fill={fill} />
  </svg>
);

DotIcon.propTypes = {
  fill: string,
  size: number,
};

DotIcon.defaultProps = {
  fill: '#787F88',
  size: 16,
};

export default DotIcon;
