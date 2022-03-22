import styled from 'styled-components';
import MenuItemBase from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import checkmark from '../../assets/img/checkmark.svg';

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
    padding-top: 10px;
    padding-bottom: 10px;

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
      padding-bottom: 0;
    }
  }
`;

export { StyledMenuItem, StyledPaper, StyledMenuList, StyledButton };
