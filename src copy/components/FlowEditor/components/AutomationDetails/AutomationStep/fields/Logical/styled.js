import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import { StyledSelect as StyledSelectBase } from '../styled';
import THEME from '../../../../../../../constants/theme';

const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    &.Mui-selected {
      color: ${THEME.primaryColors.primary};
      background-color: transparent;
    }
  }
`;

const StyledSelect = styled(StyledSelectBase)`
  &.MuiInputBase-root {
    border-radius: 8px;
    font-weight: 500;
    color: ${THEME.primaryColors.primary};
    background-color: ${THEME.primaryColors.primaryLight};
    &:before,
    &:after {
      display: none;
    }
  }
  & .MuiSelect-root {
    &.MuiSelect-select {
      &.MuiSelect-select {
        padding: 13px 36px 11px 16px;
      }
    }
  }
  & .MuiSelect-icon {
    color: currentColor;
    right: 7px;
    top: 9px;
  }
`;

export { StyledMenuItem, StyledSelect };
