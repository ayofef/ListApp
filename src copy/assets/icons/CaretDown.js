import PropTypes from 'prop-types';
import React from 'react';

const CaretDown = ({ fill }) => {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.62424 5.57L1.22624 2.829C0.943238 2.5065 1.17324 2 1.60274 2H6.39874C6.49486 1.99992 6.58897 2.02754 6.66979 2.07957C6.75062 2.1316 6.81474 2.20582 6.85446 2.29335C6.89419 2.38087 6.90785 2.478 6.8938 2.57309C6.87975 2.66818 6.83858 2.7572 6.77524 2.8295L4.37724 5.5695C4.33031 5.6232 4.27243 5.66625 4.20749 5.69574C4.14256 5.72523 4.07206 5.74049 4.00074 5.74049C3.92942 5.74049 3.85892 5.72523 3.79398 5.69574C3.72905 5.66625 3.67117 5.6232 3.62424 5.5695V5.57Z"
        fill={fill}
      />
    </svg>
  );
};

CaretDown.propTypes = {
  fill: PropTypes.string,
};
CaretDown.defaultProps = {
  fill: '#000',
};

export default CaretDown;
