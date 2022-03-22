import PropTypes from 'prop-types';
import React from 'react';
import THEME from '../../../constants/theme';
import { StyledCircularProgressBar } from './styled';

const CircularProgressBar = ({ progress }) => {
  return (
    <StyledCircularProgressBar $progress={progress}>
      <svg width="48" height="48" viewBox="0 0 36 36">
        <circle className="outer" cx="50%" cy="50%" r="16" />
        <circle className="progress-bar" cx="50%" cy="50%" r="16" pathLength="10" />

        <defs>
          <linearGradient id="linear-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={THEME.primaryColors.orange} />
            <stop offset="25%" stopColor={THEME.primaryColors.orange} />
            <stop offset="75%" stopColor={THEME.primaryColors.orange} />
            <stop offset="100%" stopColor={THEME.primaryColors.orange} />
          </linearGradient>
        </defs>
      </svg>
    </StyledCircularProgressBar>
  );
};

CircularProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default CircularProgressBar;
