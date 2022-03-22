import React from 'react';
import PropTypes from 'prop-types';

const Play = ({ stroke, ...props }) => (
  <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M2.07735 15C1.43094 15 1 14.5247 1 13.7815V2.21852C1 1.47531 1.43094 1 2.07735 1C2.42749 1 2.71478 1.12099 3.08287 1.31975L13.0214 6.8593C13.7396 7.2568 14 7.542 14 8C14 8.458 13.7396 8.7432 13.0214 9.1407L3.08287 14.6802C2.71478 14.879 2.42749 15 2.07735 15Z"
      stroke={stroke}
      strokeWidth="2"
    />
  </svg>
);

Play.propTypes = {
  stroke: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Play.defaultProps = {
  stroke: 'white',
};

export default Play;
