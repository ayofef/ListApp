import PropTypes from 'prop-types';
import React from 'react';
import ChevronDown from '../../../assets/icons/Select/ChevronDown';
import { StyledSelectIconWrapper } from './styled';

const MUI_SELECT_OPEN_CLASS_NAME = 'MuiSelect-iconOpen';

const SelectDropdownIcon = ({ className }) => {
  const isOpen = className?.includes(MUI_SELECT_OPEN_CLASS_NAME);

  return (
    <StyledSelectIconWrapper className={className} $isOpen={isOpen}>
      <ChevronDown />
    </StyledSelectIconWrapper>
  );
};

SelectDropdownIcon.propTypes = {
  className: PropTypes.string.isRequired,
};

export default SelectDropdownIcon;
