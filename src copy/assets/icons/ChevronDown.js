import React from 'react';
import { number, string } from 'prop-types';

const ChevronDown = ({ width, height, color }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.52861 5.52861C3.78896 5.26826 4.21107 5.26826 4.47141 5.52861L8.00001 9.0572L11.5286 5.52861C11.789 5.26826 12.2111 5.26826 12.4714 5.52861C12.7318 5.78896 12.7318 6.21107 12.4714 6.47141L8.47141 10.4714C8.21107 10.7318 7.78896 10.7318 7.52861 10.4714L3.52861 6.47141C3.26826 6.21107 3.26826 5.78896 3.52861 5.52861Z"
        fill={color}
      />
    </svg>
  );
};

ChevronDown.propTypes = {
  width: number,
  height: number,
  color: string,
};

ChevronDown.defaultProps = {
  width: 16,
  height: 16,
  color: '#6A6A6A',
};

export default ChevronDown;
