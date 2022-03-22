import React from 'react';
import PropTypes from 'prop-types';
import THEME from '../../constants/theme';

const PlayCircle = ({ color, ...props }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 2.50016C5.8579 2.50016 2.50004 5.85803 2.50004 10.0002C2.50004 14.1423 5.8579 17.5002 10 17.5002C14.1422 17.5002 17.5 14.1423 17.5 10.0002C17.5 5.85803 14.1422 2.50016 10 2.50016ZM0.833374 10.0002C0.833374 4.93755 4.93743 0.833496 10 0.833496C15.0626 0.833496 19.1667 4.93755 19.1667 10.0002C19.1667 15.0628 15.0626 19.1668 10 19.1668C4.93743 19.1668 0.833374 15.0628 0.833374 10.0002Z"
      fill={color}
    />
    <path
      d="M8.33337 8.22389C8.33337 7.55832 9.07516 7.16132 9.62896 7.53052L12.2933 9.30676C12.7881 9.63661 12.7881 10.3637 12.2933 10.6935L9.62896 12.4697C9.07516 12.8389 8.33337 12.4419 8.33337 11.7764V8.22389Z"
      fill={color}
    />
  </svg>
);

PlayCircle.propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
PlayCircle.defaultProps = {
  color: THEME.secondaryColors.greenDark,
};

export default PlayCircle;
