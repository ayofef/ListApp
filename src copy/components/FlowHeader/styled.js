import { TextField, withStyles, Box } from '@material-ui/core';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Popover from '@material-ui/core/Popover';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { ButtonRounded } from '../atoms';
import THEME from '../../constants/theme';

export const AbsoluteTopButtonContainer = styled.div`
  position: fixed;
  width: 100%;
  transition: width 0.3s ease-out;
  display: flex;
  flex-direction: row;
  z-index: 55;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  padding: 12px 40px 12px 24px;
  box-sizing: border-box;
`;

export const TopButtonGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .MuiButton-containedSecondary {
    background-color: #e6e9ec !important;
  }
`;

export const TopButtonContainer = styled.div`
  position: relative;
  padding-right: 8px;
`;

export const StyledRoundedTextField = styled(TextField)`
  & .MuiOutlinedInput-notchedOutline {
    border-radius: 8px !important;
    border-width: 2px !important;
    border-color: #e6e9ec !important;
    color: #232629;
  }
  & .MuiInputBase-input {
    border-radius: 8px !important;
    border-width: 2px !important;
    line-height: 14px;
    background-color: #e6e9ec !important;
  }
  & .Mui-focused {
    .MuiInputBase-input {
      background-color: #fff !important;
    }
    .MuiOutlinedInput-notchedOutline {
      border-color: rgba(105, 68, 255, 0.28) !important;
    }
  }
`;

StyledRoundedTextField.defaultProps = {
  variant: 'outlined',
  size: 'small',
};

export const StyledBox = withStyles({
  root: {
    minWidth: 'min-content',
    margin: '0 auto',
    position: 'absolute',
    backgroundColor: '#fff',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    outline: 'none',
    padding: '32px',
    borderRadius: '24px',
    boxShadow: '0px 0px 0px 2px rgba(155, 159, 171, 0.17)',
  },
})(Box);

export const StyledButton = styled(ButtonRounded)`
  margin: 24px;
  span {
    padding: 0 10px;
  }
`;

export const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  height: 100%;
  color: ${THEME.greyColors.grey1};
  font-size: 14px;
  font-weight: 500;
  margin-right: 24px;
  &.active {
    color: ${THEME.primaryColors.primary};
    border-bottom: 2px solid ${THEME.primaryColors.primary};
  }
`;

export const StyledPopover = styled(Popover)`
  & .MuiPopover-paper {
    border: 1px solid ${THEME.greyColors.grey5} !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    border-radius: 6px;
  }
`;

export const VerticalLine = styled(Box)`
  margin-right: ${({ $marginRight }) => $marginRight || '0'};
  width: 1px;
  height: 24px;
  background: ${THEME.greyColors.grey5};
`;

export const StyledToggleGroup = styled(ToggleButtonGroup)`
  padding: ${({ $hasPadding }) => ($hasPadding ? '0 14px' : '0px')};
`;

export const StyledToggleButton = styled(ToggleButton)`
  &.MuiToggleButton-root.MuiToggleButtonGroup-grouped {
    font-weight: 500;
    color: ${THEME.greyColors.grey9};
    padding: 4px 12px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    text-transform: capitalize;
    transition: all 0.3s ease-out;
    &:hover {
      background-color: ${THEME.greyColors.grey12};
    }
  }
  &.MuiToggleButton-root.Mui-selected {
    background-color: ${THEME.primaryColors.primaryLight};
    color: ${THEME.primaryColors.primary};
    &:hover {
      background-color: ${THEME.primaryColors.primaryLight};
    }
  }
  &:first-child {
    margin-right: 4px;
  }
`;

export const StyledRunsBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 18px;
  padding-right: ${({ $errorCount }) => ($errorCount ? '24px' : '18px')};
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease-out;
  cursor: pointer;
  &:hover {
    background-color: ${THEME.greyColors.grey12};
  }
`;

export const StyledErrorsButton = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
