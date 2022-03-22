import styled, { css } from 'styled-components';
import Popover from '@material-ui/core/Popover/Popover';
import IconButtonBase from '@material-ui/core/IconButton';
import { StyledOptionMenuItem } from '../../SwitchUser/styled';

const StyledPopover = styled(Popover)`
  & .MuiPaper-root {
    min-width: ${({ width }) => `${width} !important` || 'min-content'};
  }
`;
const StyledList = styled.ul`
  padding: 8px 0 !important;
  margin: 0;
  list-style: none;

  ${({ lastItemDanger }) =>
    lastItemDanger
      ? css`
          & > :last-child {
            color: #b74242 !important;
          }
        `
      : undefined};
`;

const StyledListItem = styled(StyledOptionMenuItem)`
  color: #000000;
  font-weight: 600 !important;
  font-size: ${({ $isSelect }) => ($isSelect ? '12px !important' : '14px !important')};
  padding: 6px 16px !important;
  margin: 0 !important;
`;

const IconButton = styled(IconButtonBase)`
  &.MuiButtonBase-root {
    transition: all 0.3s ease-out;
    border-radius: 8px !important;
    background-color: ${({ bgcolor }) => bgcolor || '#F5F6F7'};
    padding: ${({ p }) => p || '8px'};

    &:hover {
      background-color: ${({ bgcolor }) => (bgcolor ? '#f5f6f7' : '#E6E9EC')};
    }

    color: ${({ $color }) => $color || '#787F88'};
  }
`;

export { StyledListItem, StyledList, StyledPopover, IconButton };
