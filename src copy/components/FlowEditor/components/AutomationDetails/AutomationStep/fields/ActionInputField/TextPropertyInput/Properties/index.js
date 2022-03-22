import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { StyledButton } from './styled';
import AddPropertySVG from '../../../../../../../../../assets/icons/AddPropertySVG';

const Properties = ({ properties, handleSelect }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpen = useCallback(({ currentTarget }) => setAnchorEl(currentTarget), []);
  const handleClose = useCallback(() => setAnchorEl(null), []);
  const open = anchorEl !== null;
  const clickHandler = useCallback(
    ({ currentTarget }) => {
      const value = currentTarget?.dataset.value;

      if (value === undefined) return;

      handleSelect(value);
      setAnchorEl(null);
    },
    [handleSelect]
  );

  if (!properties?.length) return null;

  return (
    <>
      <StyledButton onClick={handleOpen}>
        <AddPropertySVG />
      </StyledButton>

      <Menu id="properties" open={open} anchorEl={anchorEl} onClose={handleClose}>
        {properties.map((option) => (
          <MenuItem key={option.value} onClick={clickHandler} data-value={option.value}>
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

Properties.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  handleSelect: PropTypes.func.isRequired,
};

Properties.defaultProps = {
  properties: [],
};

export default Properties;
