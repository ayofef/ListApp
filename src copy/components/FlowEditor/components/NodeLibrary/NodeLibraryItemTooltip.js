import React, { useEffect, useMemo, useState } from 'react';
import { bool, string } from 'prop-types';
import { makeStyles, Tooltip } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { getNodeTooltip } from './constant';
import THEME from '../../../../constants/theme';

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

const NodeLibraryItemTooltip = ({ children, name, __typename, isDragging }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const title = useMemo(() => getNodeTooltip(name, __typename), [__typename, name]);

  useEffect(() => {
    if (isDragging) {
      setOpen(false);
    }
  }, [isDragging]);

  return (
    <Tooltip
      placement="right"
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

NodeLibraryItemTooltip.propTypes = {
  name: string,
  __typename: string,
  isDragging: bool,
};

NodeLibraryItemTooltip.defaultProps = {
  name: '',
  __typename: '',
  isDragging: false,
};

export default NodeLibraryItemTooltip;
