import React from 'react';
import PropTypes from 'prop-types';

const More = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6.66663" width="2.66667" height="2.66667" rx="1.33333" fill="#787F88" />
    <rect x="6.66667" y="6.66663" width="2.66667" height="2.66667" rx="1.33333" fill="#787F88" />
    <rect x="11.3333" y="6.66663" width="2.66667" height="2.66667" rx="1.33333" fill="#787F88" />
  </svg>
);

More.propTypes = {
  size: PropTypes.number,
};

More.defaultProps = {
  size: 16,
};

export default More;
