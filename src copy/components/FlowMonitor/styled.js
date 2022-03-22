import styled, { css } from 'styled-components';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { Box } from '@material-ui/core';
import THEME from '../../constants/theme';

export const StyledDetailsBox = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const StyledWrapper = styled(Box)`
  padding: 0 8px 4px 8px;
  overflow: hidden;
  height: 100%;
  position: relative;
  border-top: 1px solid ${THEME.greyColors.grey5};
  &:after {
    content: '';
    display: ${({ $hideSeparator }) => ($hideSeparator ? 'none' : 'block')};
    height: 1px;
    width: 100%;
    background: ${THEME.greyColors.grey5};
    position: absolute;
    top: 50px;
    left: 0;
  }
`;

export const StyledToggleGroup = styled(ToggleButtonGroup)`
  &.MuiToggleButtonGroup-root {
    width: 390px;
    flex-shrink: 0;
    border: 1px solid ${THEME.greyColors.grey11};
    border-radius: 8px;
    overflow: hidden;
    box-sizing: border-box;
  }
`;

export const StyledToggleButton = styled(ToggleButton)`
  &.MuiToggleButton-root.MuiToggleButtonGroup-grouped {
    font-weight: 500;
    color: ${THEME.primaryColors.white};
    padding: 4px 12px;
    border: none;
    border-radius: 4px;
    flex: 1;
    text-transform: capitalize;
    cursor: pointer;
    &:hover {
      background-color: ${THEME.greyColors.grey11}70;
    }
  }
  &.MuiToggleButton-root.Mui-selected {
    background-color: ${THEME.greyColors.grey11};
    color: ${THEME.primaryColors.white};
    &:hover {
      background-color: ${THEME.greyColors.grey11};
    }
  }
`;

export const StyledRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  outline: none;
  border: none;
  box-sizing: border-box;
  text-align: left;
  border-bottom: 0;
  margin-left: -10px;
  padding: 0 10px;
  & > .MuiBox-root {
    margin-left: 20px;
  }
`;

export const StyledTableBox = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledPaginationBox = styled(Box)`
  display: flex;
  align-items: end;
  flex: 1;
  padding: 0 24px 18px;
`;
export const StyledLogsValue = styled.div`
  position: relative;
  & > svg {
    position: absolute;
    top: ${({ $isOpen }) => ($isOpen ? '10px' : '4px')};
    right: 10px;
    transition: all 0.2s ease-out;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(0deg)' : 'rotate(-180deg)')};
  }
  ${({ $isExpandable }) =>
    $isExpandable &&
    css`
      width: 100%;
      margin-left: -16px;
      padding: ${({ $isOpen }) => ($isOpen ? '8px 16px' : '0 16px')};
      height: ${({ $isOpen, $height }) => ($isOpen ? `${$height}px` : '16px')};
      overflow: hidden;
      transition: all 0.2s ease-out;
      cursor: pointer;
      background: ${({ $isOpen }) => ($isOpen ? THEME.greyColors.grey800 : 'transparent')};
      border-radius: 6px;
    `}
`;
