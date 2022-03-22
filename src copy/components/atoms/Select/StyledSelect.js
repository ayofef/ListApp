import React, { useCallback } from 'react';
import { string, shape, arrayOf, oneOfType, number, func, bool } from 'prop-types';
import { MenuItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import { useToggle } from 'react-use';
import CheckIcon from '../../../assets/icons/Select/CheckIcon';
import THEME from '../../../constants/theme';
import { P14 } from '../Typography/P14';
import StyledFormControl from '../../styled/StyledFormControl';
import CustomSelect from './CustomSelect';

const StyledPaper = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04) !important;
  border-radius: 6px !important;
  margin-top: 6px;
`;
const StyledMenuItem = styled(MenuItem)`
  &.MuiButtonBase-root {
    font-size: 12px;
    font-weight: 600;
    display: flex;
    justify-content: ${({ $justifyContent }) => $justifyContent || 'flex-start'};
    align-items: center;
    transition: all 0.3s ease-out;
    padding-top: ${({ pt }) => pt || '8px'};
    padding-bottom: 8px;

    .check-icon {
      display: none;
      visibility: hidden;
      opacity: 0;
      margin-left: auto;
      margin-right: 8px;
    }
    &:hover {
      background-color: #fff !important;
      color: #4e40ef;
    }
  }
  &.Mui-selected {
    background-color: #fff !important;
    color: #4e40ef;
    .check-icon {
      display: block;
      visibility: visible;
      opacity: 1;
      margin-left: 6px;
      transform: translateX(6px);
    }
  }
  &.Mui-focusVisible {
    background: white !important;
  }
`;

const StyledSelect = ({
  paperComponent,
  hideLink,
  id,
  name,
  options,
  value,
  onChange,
  label,
  open,
  onClose,
  renderValue,
  displayEmpty,
  ...restProps
}) => {
  const [isOpen, toggleOpen] = useToggle(open || false);
  const handleOnChange = useCallback(
    (e) =>
      e.target.value !== 'addCard' ? onChange(e) : options.find((item) => item.value === 'addCard').clickHandler(),
    [options, onChange]
  );
  const handleClose = (e) => {
    e.stopPropagation();
    onClose(e);
    toggleOpen();
  };
  return (
    <StyledFormControl variant="outlined" {...restProps}>
      <CustomSelect
        open={isOpen}
        onOpen={toggleOpen}
        onClose={handleClose}
        labelId={`${name}-label`}
        value={value}
        id={name}
        name={name}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
          PaperProps: {
            component: paperComponent ?? StyledPaper,
          },
        }}
        displayEmpty={displayEmpty}
        IconComponent={ExpandMoreIcon}
        inputProps={{ name, id, onChange: handleOnChange, value }}
        {...(renderValue && { renderValue })}
        {...restProps}
      >
        {options.map((option) => (
          <StyledMenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            $justifyContent="space-between"
          >
            {option.icon || null}
            {option.text.text ? option.text.text : '0'}
            <CheckIcon />
            {!hideLink && option.connectedIds && (
              <P14 margin="0 0 0 auto" color={THEME.greyColors.grey2}>
                {!isEmpty(option.connectedIds.find((item) => item.id === option.value)) ? 'Linked' : 'Not linked'}
              </P14>
            )}
          </StyledMenuItem>
        ))}
      </CustomSelect>
    </StyledFormControl>
  );
};

StyledSelect.propTypes = {
  name: string.isRequired,
  onChange: func.isRequired,
  value: oneOfType([number, string, arrayOf(string)]).isRequired,
  options: arrayOf(shape({})).isRequired,
  id: string,
  label: string,
  hideLink: bool,
  open: bool,
  onClose: func,
  paperComponent: func,
  renderValue: func,
  displayEmpty: bool,
};
StyledSelect.defaultProps = {
  id: null,
  label: null,
  hideLink: false,
  open: false,
  onClose: () => null,
  paperComponent: undefined,
  renderValue: undefined,
  displayEmpty: false,
};

export default StyledSelect;
export { StyledPaper, StyledMenuItem, CustomSelect, StyledFormControl };
