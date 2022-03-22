import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ size, fill }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.80004 12.4001C10.7883 12.4001 12.4 10.7883 12.4 8.8001C12.4 6.81187 10.7883 5.2001 8.80004 5.2001C6.81181 5.2001 5.20004 6.81187 5.20004 8.8001C5.20004 10.7883 6.81181 12.4001 8.80004 12.4001ZM8.80004 14.0001C11.6719 14.0001 14 11.672 14 8.8001C14 5.92822 11.6719 3.6001 8.80004 3.6001C5.92816 3.6001 3.60004 5.92822 3.60004 8.8001C3.60004 11.672 5.92816 14.0001 8.80004 14.0001Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.4 16.3999C16.0876 16.7123 15.5811 16.7123 15.2687 16.3999L11.6 12.7312C11.2876 12.4188 11.2876 11.9123 11.6 11.5999C11.9125 11.2874 12.419 11.2874 12.7314 11.5999L16.4 15.2685C16.7125 15.5809 16.7125 16.0874 16.4 16.3999Z"
      fill={fill}
    />
  </svg>
);

Search.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

Search.defaultProps = {
  size: 20,
  fill: '#fff',
};

export default Search;
