import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';

import { func, node, bool, oneOfType, arrayOf } from 'prop-types';
import { useStyles, IconButton } from '../styled';
import { H1Dashboard } from '../../../atoms';

const SearchDrawer = ({ children, open, handleDrawerClose }) => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <H1Dashboard margin="0 0 2px 0">Filter</H1Dashboard>

        <IconButton onClick={handleDrawerClose}>
          <CloseIcon />
        </IconButton>
      </div>
      {children}
    </Drawer>
  );
};

SearchDrawer.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  open: bool,
  handleDrawerClose: func.isRequired,
};

SearchDrawer.defaultProps = {
  open: false,
};

export default SearchDrawer;
