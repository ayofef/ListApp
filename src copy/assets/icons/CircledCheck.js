import PropTypes from 'prop-types';
import React from 'react';

const CircledCheck = ({ size, fill }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 11.1772V12.0052C20.9989 13.9459 20.3704 15.8343 19.2083 17.3888C18.0464 18.9432 16.413 20.0803 14.5518 20.6307C12.6906 21.1809 10.7016 21.1149 8.88101 20.4422C7.0605 19.7696 5.50618 18.5267 4.44986 16.8985C3.39354 15.2704 2.89181 13.3444 3.01951 11.4078C3.1472 9.47125 3.89749 7.62784 5.15845 6.15252C6.41941 4.67719 8.1235 3.649 10.0166 3.22128C11.9096 2.79357 13.8903 2.98926 15.663 3.77915M21 4.80515L12 13.8142L9.3 11.1142"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

CircledCheck.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};
CircledCheck.defaultProps = {
  size: 24,
  fill: '#fff',
};

export default CircledCheck;
