import React from 'react';
import { withStyles, LinearProgress } from '@material-ui/core';
import { string, number } from 'prop-types';
import THEME from '../../../constants/theme';

const linearProgress = (barBackground, height, borderRadius) =>
  withStyles({
    root: {
      width: '100%',
      height,
      backgroundColor: THEME.greyColors.grey4,
      borderRadius,
    },
    bar: {
      borderRadius,
      backgroundColor: barBackground,
    },
  })(LinearProgress);

const BorderLinearProgress = ({ backgroundColor, height, borderRadius, ...props }) => {
  const Progress = linearProgress(backgroundColor, height, borderRadius);
  return <Progress {...props} />;
};

BorderLinearProgress.propTypes = {
  backgroundColor: string,
  height: number,
  borderRadius: number,
};
BorderLinearProgress.defaultProps = {
  backgroundColor: 'THEME.secondaryColors.blue',
  height: 2,
  borderRadius: 20,
};

export default BorderLinearProgress;
