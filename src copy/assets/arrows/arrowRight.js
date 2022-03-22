import React from 'react';
import { number, string } from 'prop-types';
import THEME from '../../constants/theme';

const ArrowRight = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.66675 8.00004C2.66675 7.63185 2.96522 7.33337 3.33341 7.33337H12.6667C13.0349 7.33337 13.3334 7.63185 13.3334 8.00004C13.3334 8.36823 13.0349 8.66671 12.6667 8.66671H3.33341C2.96522 8.66671 2.66675 8.36823 2.66675 8.00004Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.52851 2.86189C7.78886 2.60154 8.21097 2.60154 8.47132 2.86189L13.138 7.52855C13.3983 7.7889 13.3983 8.21101 13.138 8.47136L8.47132 13.138C8.21097 13.3984 7.78886 13.3984 7.52851 13.138C7.26816 12.8777 7.26816 12.4556 7.52851 12.1952L11.7238 7.99996L7.52851 3.8047C7.26816 3.54435 7.26816 3.12224 7.52851 2.86189Z"
      fill={color}
    />
  </svg>
);

ArrowRight.propTypes = {
  size: number,
  color: string,
};

ArrowRight.defaultProps = {
  size: 16,
  color: THEME.primaryColors.primary,
};

export default ArrowRight;
