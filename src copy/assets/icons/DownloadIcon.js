import React from 'react';
import PropTypes from 'prop-types';

const DownloadIcon = ({ fill, size, strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className="path" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.88867 19.1111H19.1109" stroke={fill} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
    <path
      d="M8.2666 12L11.9999 15.7333L15.7333 12"
      stroke={fill}
      strokeWidth={strokeWidth}
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path d="M12 15.5556V4.88892" stroke={fill} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
  </svg>
);
DownloadIcon.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
};
DownloadIcon.defaultProps = {
  fill: '#787F88',
  size: 24,
  strokeWidth: 2,
};
export default DownloadIcon;
