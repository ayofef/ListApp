import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Popover from '../../../../components/atoms/OptionsMenu/Popover';
import { StyledButton } from './styled';

const CellDropdown = ({ options, lastItemDanger, width, children, handleChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (e) => {
    e.stopPropagation();
    return setAnchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <StyledButton type="button" onClick={handleOpen}>
        <div>{children}</div>
      </StyledButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        width={width}
        lastItemDanger={lastItemDanger}
        options={options}
        handleSelect={handleChange}
      />
    </>
  );
};

CellDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  lastItemDanger: PropTypes.bool,
  width: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

CellDropdown.defaultProps = {
  lastItemDanger: false,
  width: undefined,
};

export default CellDropdown;
