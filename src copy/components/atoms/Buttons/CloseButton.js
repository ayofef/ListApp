import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { func } from 'prop-types';
import THEME from '../../../constants/theme';
import { ColorProvider } from '../ColorProvider';

export const useStyles = makeStyles(() => ({
  closeButton: {
    background: THEME.primaryColors.white,
    border: `1px solid ${THEME.greyColors.grey4}`,
    transition: 'all .3s ease',
    zIndex: 10,
    '&:hover': {
      background: THEME.primaryColors.white,
      opacity: 0.8,
    },
  },
}));

const CloseButton = ({ onClick, ...restProps }) => {
  const classes = useStyles();

  return (
    <ColorProvider color={THEME.primaryColors.black} {...restProps}>
      <IconButton className={classes.closeButton} color="inherit" onClick={onClick}>
        <ClearIcon />
      </IconButton>
    </ColorProvider>
  );
};

CloseButton.propTypes = {
  onClick: func.isRequired,
};

export default CloseButton;
