import React, { useState } from 'react';
import { string } from 'prop-types';
import { makeStyles, Tooltip } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import THEME from '../../constants/theme';

const useStyles = makeStyles(() => ({
  tooltip: {
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '16px',
    background: THEME.primaryColors.black,
  },
}));

const StyledTooltip = ({ children, title, placement }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Tooltip
      placement={placement}
      disableFocusListener
      disableTouchListener
      disableHoverListener
      title={title}
      classes={classes}
      open={open}
    >
      <Box onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        {children}
      </Box>
    </Tooltip>
  );
};

StyledTooltip.propTypes = {
  title: string,
  placement: string,
};

StyledTooltip.defaultProps = {
  title: '',
  placement: 'top',
};

export default StyledTooltip;
