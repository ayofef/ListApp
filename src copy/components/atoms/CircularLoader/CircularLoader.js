import React from 'react';
import { CircularProgress, withStyles } from '@material-ui/core';
import THEME from '../../../constants/theme';

const StyledProgress = withStyles({
  root: {
    '& .MuiCircularProgress-circle': { stroke: ({ bgcolor }) => bgcolor || THEME.primaryColors.primary },
  },
})(CircularProgress);

const CircularLoader = (props) => <StyledProgress thickness={3} {...props} />;

export default CircularLoader;
