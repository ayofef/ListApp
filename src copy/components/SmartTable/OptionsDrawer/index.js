import React, { useEffect, useCallback } from 'react';
import { Drawer } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useLocation } from 'react-router-dom';
import { useStyles, IconButton } from '../../../pages/Payments/styled';
import { P16B } from '../../atoms';
import AllOptions from './AllOptions';
import SubMenus from './SubMenus';
import { DICTIONARY } from './constant';
import useTableContext from '../TableContext';
import { useRightAsideContext } from '../../../providers/RightAsideProvider';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const OptionsDrawer = () => {
  const { drawerOpen, setActiveDrawer, activeDrawer } = useTableContext();
  const { toggleGlobalFilterState } = useRightAsideContext();
  const { pathname } = useLocation();
  const classes = useStyles();

  useEffect(() => {
    return () => {
      setActiveDrawer({});
      toggleGlobalFilterState(false);
    };
  }, [pathname, setActiveDrawer, toggleGlobalFilterState]);

  const handleCloseDrawer = useCallback(() => {
    setActiveDrawer({});
    toggleGlobalFilterState(false);
  }, [setActiveDrawer, toggleGlobalFilterState]);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={drawerOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {activeDrawer?.subMenu === DICTIONARY.home && (
        <>
          <div className={classes.drawerHeader}>
            <P16B>Options</P16B>
            <IconButton onClick={handleCloseDrawer} bgcolor="#fff">
              <CloseIcon />
            </IconButton>
          </div>

          <FlexContainer
            justifyContent="flex-start"
            alignItems="flex-start"
            flexDirection="column"
            width="100%"
            flex={1}
            padding="0 16px"
            margin="20px 0 0 0"
          >
            <AllOptions />
          </FlexContainer>
        </>
      )}

      <SubMenus handleCloseDrawer={handleCloseDrawer} />
    </Drawer>
  );
};

export default OptionsDrawer;
