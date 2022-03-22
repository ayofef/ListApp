import React from 'react';
import PropTypes from 'prop-types';

const Refresh = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.59999 7.64196C5.0821 5.82301 6.49683 3.59985 10.0337 3.59985C13.5368 3.59985 16.4 6.46301 16.4 9.99985"
      stroke="white"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path d="M3.59999 4.27344V7.64186H6.96841" fill="white" />
    <path d="M3.59999 4.27344V7.64186H6.96841" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
    <path
      d="M16.4 12.3577C14.9179 14.1092 13.5031 16.3998 9.96631 16.3998C6.42946 16.3998 3.59999 13.5366 3.59999 10.0334V9.99976"
      stroke="white"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path d="M16.4 15.7261V12.3577H13.0316" fill="white" />
    <path d="M16.4 15.7261V12.3577H13.0316" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
  </svg>
);

Refresh.propTypes = {
  size: PropTypes.number,
};

Refresh.defaultProps = {
  size: 20,
};

export default Refresh;
