import { useState } from 'react';

const usePopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = ({ currentTarget }) => {
    return setAnchorEl(currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  return {
    anchorEl,
    handleOpen,
    handleClose,
    open,
  };
};

export { usePopover };
