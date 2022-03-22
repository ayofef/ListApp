import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4.39999" y="6" width="11.2" height="1.6" rx="0.8" fill="white" />
    <rect x="6" y="9.19995" width="8" height="1.6" rx="0.8" fill="white" />
    <rect x="8.39999" y="12.3999" width="3.2" height="1.6" rx="0.8" fill="white" />
  </svg>
);

Filter.propTypes = {
  size: PropTypes.number,
};

Filter.defaultProps = {
  size: 20,
};

export default Filter;
