import React from 'react';
import { number, string } from 'prop-types';

const Star = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.50294 0L7.19797 3.29021L11 3.8189L8.25147 6.38358L8.89888 10L5.50294 8.29021L2.10112 10L2.74853 6.38358L0 3.8189L3.80203 3.29021L5.50294 0Z"
      fill={color}
    />
  </svg>
);

Star.propTypes = {
  size: number,
  color: string,
};

Star.defaultProps = {
  size: 12,
  color: '#fff',
};

export default Star;
