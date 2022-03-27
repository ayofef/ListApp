import React from 'react';
import noop from 'lodash/noop';

import Popover from '../../../../atoms/Popover';
import { usePopover } from '../../../../atoms/Popover/usePopover';
import { useGlobalContext } from '../../../../../context';
import { generateInitials } from '../../../../../utils/generateInitials';
import { StyledAvatar } from './styled';

function UserMenu() {
  const { anchorEl, handleOpen, handleClose, open } = usePopover();
  const { profile, handleDeleteAccount, signOut } = useGlobalContext();
  const initials = generateInitials(profile.username)?.toUpperCase();

  const handleDelete = () => {
    handleClose();
    handleDeleteAccount();
  };

  const options = [
    {
      label: profile.username,
      onClick: noop,
      disabled: true,
    },
    {
      label: 'Sign out',
      onClick: signOut,
    },
    {
      label: 'Delete Account',
      onClick: handleDelete,
      dangerItem: true,
    },
  ];

  return (
    <>
      <StyledAvatar onClick={handleOpen} color="red">
        {initials}
      </StyledAvatar>
      <Popover open={open} anchorEl={anchorEl} handleClose={handleClose} width="160px" options={options} />
    </>
  );
}

export default UserMenu;
