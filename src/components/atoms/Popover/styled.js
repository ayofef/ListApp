import styled, { css } from 'styled-components';
import Popover from '@material-ui/core/Popover/Popover';
import THEME from '../../../constants/theme';

const StyledPopover = styled(Popover)`
  & .MuiPaper-root {
    min-width: ${({ width }) => `${width} !important` || 'min-content'};
  }
`;

const StyledListItem = styled.li`
  color: ${({ $dangerItem }) => ($dangerItem ? THEME.secondaryColors.error : '#000')};

  font-weight: 600;
  font-size: 14px;
  padding: 6px 16px;
  margin: 0;
  list-style-type: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${THEME.primaryColors.primaryLight};
    color: ${({ $dangerItem }) => ($dangerItem ? THEME.secondaryColors.error : THEME.primaryColors.primary)};
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
       {
        color: #000;
        &:hover {
          color: #000;
          background-color: #fff;
        }
        cursor: not-allowed;
      }
    `}
  & .MuiGrid-root {
    z-index: 1000;
  }
`;

const StyledOptionsPaper = styled.div`
  &.MuiPaper-root {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
    transform: translate(-100px, 4px) !important;
    padding: 6px !important;

    @media screen and (max-width: 700px) {
      transform: translate(0, 4px) !important;
    }

    &.MuiPaper-rounded {
      border-radius: 6px;
    }
  }
`;

export { StyledListItem, StyledPopover, StyledOptionsPaper };
