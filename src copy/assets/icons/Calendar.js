import React from 'react';
import PropTypes from 'prop-types';

const Calendar = ({ size, stroke }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.79999 5.2V2V5.2ZM13.2 5.2V2V5.2ZM17.2 11.6H2.79999H17.2ZM5.19999 16.4H14.8C16.1255 16.4 17.2 15.3255 17.2 14V6C17.2 4.67452 16.1255 3.6 14.8 3.6H5.19999C3.87451 3.6 2.79999 4.67452 2.79999 6V14C2.79999 15.3255 3.87451 16.4 5.19999 16.4Z"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

Calendar.propTypes = {
  size: PropTypes.number,
  stroke: PropTypes.string,
};

Calendar.defaultProps = {
  size: 20,
  stroke: 'white',
};

export default Calendar;
