import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { node, oneOfType, arrayOf, shape } from 'prop-types';
import { WrapModal } from '../../atoms';

const ITEM_HEIGHT = 24;

const MenuList = ({ options, children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleChoose = (option, key) => {
    option[key]();
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const renderOption = (option, key) => {
    return (
      <MenuItem key={key} onClick={() => handleChoose(option, key)}>
        {key}
      </MenuItem>
    );
  };
  const renderOptions = (_options) => {
    return _options.map((option) => {
      const dataKeys = Object.keys(option);
      return dataKeys.map((key) => renderOption(option, key));
    });
  };
  return (
    <div>
      {anchorEl && <WrapModal onClick={() => setAnchorEl(null)} />}
      <IconButton aria-controls="simple-menu" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        aria-haspopup="true"
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
            zIndex: '10000',
            fontSize: 14,
          },
        }}
      >
        {renderOptions(options)}
        {children}
      </Menu>
    </div>
  );
};

MenuList.propTypes = {
  options: arrayOf(shape({})),
  children: oneOfType([arrayOf(node), node]).isRequired,
};
MenuList.defaultProps = {
  options: [],
};
export default MenuList;
