import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import { func, shape } from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../../../containers/App/context';
import { useStyles } from './styled';
import { CircleImage, CircleWrapper, P14 } from '../../atoms';
import { ChevronDownBlackMini } from '../../../assets/icons';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const MiniProfileMenu = ({ user, setModal }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { logOut } = useGlobalContext();
  const { t } = useTranslation();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleEditProfile = () => {
    setModal('edit');
  };

  const handleLogOut = (event) => {
    logOut();
    handleClose(event);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const showUserAvatar = () => {
    return user?.avatar ? (
      <CircleImage src={user?.avatar} size={32} />
    ) : (
      <CircleWrapper size={32}>{user?.name?.charAt(0)}</CircleWrapper>
    );
  };

  return (
    <div className={classes.root}>
      <FlexContainer justifyContent="flex-end">
        {user && <P14>{user.name}</P14>}
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          className={classes.button}
          onClick={handleToggle}
        >
          {showUserAvatar()}
          <div className={classes.chevron}>
            <ChevronDownBlackMini />
          </div>
        </Button>
      </FlexContainer>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleEditProfile}>{t('miniProfileMenu.editProfile')}</MenuItem>
                  <MenuItem onClick={handleLogOut}>{t('miniProfileMenu.logOut')}</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

MiniProfileMenu.propTypes = {
  setModal: func.isRequired,
  user: shape({}),
};

MiniProfileMenu.defaultProps = {
  user: null,
};

export default MiniProfileMenu;
