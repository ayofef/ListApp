import React from 'react';
import { func, string, bool } from 'prop-types';

import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import { StyledMenuItem } from './styled';

const noop = () => {};

const MenuItem = ({ className, label, withIcon, handleSelect, subMenu, isActive }) => {
  return (
    <StyledMenuItem isActive={label === isActive} data-label={subMenu ? null : label} onClick={handleSelect}>
      <li className={className}>
        {!subMenu && label}
        {withIcon && (
          <span>
            <ArrowRightIcon color="inherit" fontSize="inherit" />
          </span>
        )}
        {subMenu && label}
      </li>
    </StyledMenuItem>
  );
};

MenuItem.propTypes = {
  className: string,
  handleSelect: func,
  label: string,
  withIcon: bool,
  subMenu: bool,
  isActive: bool,
};
MenuItem.defaultProps = {
  className: '',
  handleSelect: noop,
  label: '',
  withIcon: false,
  subMenu: false,
  isActive: false,
};

export default MenuItem;
