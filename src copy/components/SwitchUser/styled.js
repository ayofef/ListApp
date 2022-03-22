import styled from 'styled-components';
import MenuItemBase from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import checkmark from '../../assets/img/checkmark.svg';
import THEME from '../../constants/theme';

const StyledButton = styled(IconButton)`
  &.MuiIconButton-root {
    border-radius: 6px;
    &:hover {
      background-color: rgba(0, 0, 0, 0);
    }
  }
`;

const StyledMenuItem = styled(MenuItemBase)`
  &.MuiMenuItem-root {
    overflow: initial;
    min-width: 255px;
    position: relative;
    padding-top: 8px;
    padding-bottom: 8px;

    & .MuiGrid-root {
      z-index: 1000;
    }
    &:last-child {
      margin-top: 6px;
    }

    &::before {
      content: '';
      position: absolute;
      display: block;
      top: 50%;
      left: 50%;
      width: 95%;
      height: 100%;
      border-radius: 8px;
      transform: translate(-50%, -50%);
      background-color: #f5f6f7;
      opacity: 0;
      transition: all 0.3s ease-out;
    }

    &:hover {
      background-color: #fff !important;
      &::before {
        opacity: 1;
      }
    }

    &.Mui-selected {
      &:not(&:hover) {
        background-color: inherit;
      }

      &:after {
        content: url(${checkmark});
        position: absolute;
        top: 50%;
        right: 17px;
        transform: translate(0, -50%);
      }
    }
  }
`;
const StyledOptionMenuItem = styled(MenuItemBase)`
  &.MuiMenuItem-root {
    overflow: initial;
    position: relative;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: rgba(255, 255, 255, 0);
    &:hover {
      background-color: rgba(255, 255, 255, 0);
      color: ${THEME.primaryColors.primary};
    }
    & .MuiGrid-root {
      z-index: 1000;
    }

    &.Mui-selected {
      &:not(&:hover) {
        background-color: inherit;
      }

      &:after {
        content: url(${checkmark});
        position: absolute;
        top: 50%;
        right: 17px;
        transform: translate(0, -50%);
      }
    }
  }
`;
const StyledOptionsPaper = styled(Paper)`
  &.MuiPaper-root {
    box-shadow: none;
    transform: translate(-16px, 4px) !important;

    &.MuiPaper-rounded {
      border-radius: 6px;
    }

    ${({ elevation }) => `&.MuiPaper-elevation${elevation ?? 1}`} {
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
    }
  }
`;

const StyledPaper = styled(Paper)`
  &.MuiPaper-root {
    box-shadow: none;
    margin-left: 6px;

    &.MuiPaper-rounded {
      border-radius: 6px;
    }

    ${({ elevation }) => `&.MuiPaper-elevation${elevation ?? 1}`} {
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
    }
  }
`;

const StyledMenuList = styled(MenuList)`
  &.MuiList-root {
    &.MuiList-padding {
      padding-top: 3px;
      padding-bottom: 8px;
    }
  }
`;

export { StyledMenuItem, StyledPaper, StyledMenuList, StyledButton, StyledOptionMenuItem, StyledOptionsPaper };
