import React from 'react';
import { number, string } from 'prop-types';
import THEME from '../../constants/theme';

const CategoryOperations = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.66675 2.50002C1.66675 2.03978 2.03984 1.66669 2.50008 1.66669H8.33341C8.79365 1.66669 9.16675 2.03978 9.16675 2.50002V8.33335C9.16675 8.79359 8.79365 9.16669 8.33341 9.16669H2.50008C2.03984 9.16669 1.66675 8.79359 1.66675 8.33335V2.50002ZM3.33341 3.33335V7.50002H7.50008V3.33335H3.33341Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.8333 2.50002C10.8333 2.03978 11.2063 1.66669 11.6666 1.66669H17.4999C17.9602 1.66669 18.3333 2.03978 18.3333 2.50002V8.33335C18.3333 8.79359 17.9602 9.16669 17.4999 9.16669H11.6666C11.2063 9.16669 10.8333 8.79359 10.8333 8.33335V2.50002ZM12.4999 3.33335V7.50002H16.6666V3.33335H12.4999Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.8333 11.6666C10.8333 11.2064 11.2063 10.8333 11.6666 10.8333H17.4999C17.9602 10.8333 18.3333 11.2064 18.3333 11.6666V17.5C18.3333 17.9602 17.9602 18.3333 17.4999 18.3333H11.6666C11.2063 18.3333 10.8333 17.9602 10.8333 17.5V11.6666ZM12.4999 12.5V16.6666H16.6666V12.5H12.4999Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.66675 11.6666C1.66675 11.2064 2.03984 10.8333 2.50008 10.8333H8.33341C8.79365 10.8333 9.16675 11.2064 9.16675 11.6666V17.5C9.16675 17.9602 8.79365 18.3333 8.33341 18.3333H2.50008C2.03984 18.3333 1.66675 17.9602 1.66675 17.5V11.6666ZM3.33341 12.5V16.6666H7.50008V12.5H3.33341Z"
      fill={color}
    />
  </svg>
);

CategoryOperations.propTypes = {
  size: number,
  color: string,
};

CategoryOperations.defaultProps = {
  size: 20,
  color: THEME.secondaryColors.aqua,
};

export default CategoryOperations;
