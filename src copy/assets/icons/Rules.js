import React from 'react';
import PropTypes from 'prop-types';

const Rules = ({ fill, ...props }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="4.40002" y="6" width="11.2" height="1.6" rx="0.8" fill={fill} />
      <rect x="6" y="9.19995" width="8" height="1.6" rx="0.8" fill={fill} />
      <rect x="8.40002" y="12.3999" width="3.2" height="1.6" rx="0.8" fill={fill} />
    </svg>
  );
};

Rules.propTypes = {
  fill: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Rules.defaultProps = {
  fill: '#fff',
};

export default Rules;
