import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';
import { useTranslation } from 'react-i18next';
import { P16B } from '../../../components/atoms';
import { IconButton, useStyles } from '../../Payments/styled';
import { useRightAsideContext } from '../../../providers/RightAsideProvider';

const DrawerComponent = ({ drawerOpen, toggleDrawer, title, children }) => {
  const { toggleGlobalFilterState } = useRightAsideContext();
  const { t } = useTranslation();
  const classes = useStyles();
  const handleDrawer = useCallback(() => {
    toggleDrawer();
    toggleGlobalFilterState(!drawerOpen);
  }, [toggleDrawer, drawerOpen, toggleGlobalFilterState]);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={drawerOpen}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerHeader}>
        <P16B>{t(title)}</P16B>

        <IconButton onClick={handleDrawer} bgcolor="#fff">
          <CloseIcon />
        </IconButton>
      </div>

      {children}
    </Drawer>
  );
};

DrawerComponent.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default DrawerComponent;
