import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { IconButton } from './styled';
import Popover from './Popover';

const OptionsMenu = ({ options, lastItemDanger, width, bgcolor, color }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = useCallback(({ currentTarget }) => {
    return setAnchorEl(currentTarget);
  }, []);
  const handleClose = useCallback(() => setAnchorEl(null), []);

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton type="button" onClick={handleOpen} bgcolor={bgcolor} $color={color}>
        <MoreHorizIcon />
      </IconButton>
      {anchorEl && (
        <Popover
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
          width={width}
          lastItemDanger={lastItemDanger}
          options={options}
        />
      )}
    </>
  );
};

OptionsMenu.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  lastItemDanger: PropTypes.bool,
  width: PropTypes.string,
  bgcolor: PropTypes.string,
  color: PropTypes.string,
};

OptionsMenu.defaultProps = {
  lastItemDanger: false,
  width: undefined,
  bgcolor: undefined,
  color: undefined,
};

export default OptionsMenu;
