import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import THEME from '../../constants/theme';

export const StyledTable = styled(Table)`
  &.MuiTable-root {
    height: 100%;
    min-width: ${({ $minWidth }) => $minWidth || '650px'};
    width: ${({ width }) => width || '100%'};
    & .MuiTableHead-root {
      position: relative;
      & .MuiTableRow-root {
        & .MuiTableCell-root {
          padding: 16px 24px;
          &.MuiTableCell-head {
            border-bottom: none;
            font-size: 10px;
            font-weight: 500;
            line-height: 12px;
            text-transform: uppercase;
            background-color: #fff;
          }
        }
      }
      &:after {
        content: '';
        display: block;
        height: 4px;
        width: 100%;
        background: transparent;
      }
    }
    & .MuiTableBody-root {
      & .MuiTableRow-root {
        padding: ${({ $cellPadding }) => $cellPadding};
        height: 64px;
        & td:first-child {
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }
        & td:last-child {
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
        }
        & .MuiTableCell-root {
          border-bottom: none;
        }
          &.MuiTableCell-body {
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
          }
        }
      }
    }
  }
`;

export const StyledTableRow = styled(TableRow)`
  cursor: pointer;
  background: ${({ $hasError }) => ($hasError ? THEME.secondaryColors.lightRed : THEME.primaryColors.white)};
`;

export const StyledHeadCell = styled(TableCell)`
  font-weight: 600 !important;
`;

export const StyledStatusCell = styled(TableCell)`
  &.MuiTableCell-body {
    color: ${({ $color }) => $color || '#000'};
  }
`;

export const StyledEyeCell = styled(TableCell)`
  &.MuiTableCell-body {
    display: flex;
    align-items: center;
  }
`;

export const StyledErrorLogCell = styled(TableCell)`
  &.MuiTableCell-body {
    color: ${THEME.greyColors.grey1};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 240px;
  }
`;
