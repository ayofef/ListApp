import styled, { css } from 'styled-components';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import THEME from '../../constants/theme';

const TableRowRadius = css`
  & > :first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  & > :last-child {
    /* padding-right: 4px; */
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const StyledTable = styled(Table)`
  &.MuiTable-root {
    ${({ width }) => width && `width: ${width}`};
    ${({ margin }) => margin && `margin: ${margin}`};
    ${({ overflow }) => overflow && `overflow: ${overflow}`};
    min-width: 750px;
    border-collapse: separate; /**fixes missing border in mozilla */
    padding-right: 4px;

    & .MuiTableCell-root {
      border-bottom: none;
      border-top: 1px solid #e6e9ec;
      transition: all 0.3s ease-out;

      &.MuiTableCell-sizeSmall {
        padding: 9px;
        &.MuiTableCell-head {
          padding-bottom: 16px;
          font-weight: 600;
          background-color: #fff;
        }

        &.MuiTableCell-paddingCheckbox {
          padding-left: 8px;
        }
      }

      &.MuiTableCell-body {
        color: #787f88;
      }
    }
  }
`;

const BreakpointTableCell = styled(TableCell)`
  ${({ breakpoint }) => {
    if (breakpoint === 'visibleDesktopLarge') {
      return `
        @media (max-width: ${THEME.breakPoints.desktopLarge}px) {
          display: none !important;
        }
      `;
    }
    return '';
  }};

  ${({ width }) => width && `width: ${width}`};
`;

/* & .MuiTableCell-root { */

const StyledTableHead = styled(TableHead)`
  &.MuiTableHead-root {
    text-transform: uppercase;
    color: #232629;

    & .MuiTableRow-root {
      & .MuiTableCell-head {
        border-top: none !important;
      }
    }
  }

  .head-cell {
    min-width: ${({ $tableWidth }) => $tableWidth};
  }
`;

const StyledTableRow = styled(TableRow)`
  opacity: ${({ resolved }) => {
    if (resolved) {
      return 0.5;
    }
    return 1;
  }};
  &.MuiTableRow-root {
    & > :first-child {
      ${({ $checkboxEditMode, $noCheckBox }) => !$checkboxEditMode && !$noCheckBox && 'border-top: none !important'};

    }

    &:last-child {
      & > td {
        border-bottom: 1px solid #e6e9ec;
        ${({ $checkboxEditMode }) =>
          !$checkboxEditMode &&
          css`
            &:first-child {
              border: none;
              ${({ $lastRowBorder }) => ($lastRowBorder ? `border-top: 1px solid #e6e9ec;` : '')}
            }
          `}
        border-bottom: ${({ $checkboxEditMode }) => !$checkboxEditMode && '1px solid #e6e9ec'};
      }
      & > td,
      th {
        ${({ $noCheckBox }) => $noCheckBox && 'border-bottom: 1px solid #e6e9ec !important'};
      }
    }

    &.Mui-selected {
      background-color: #fff;
      ${TableRowRadius};

      td,
      th {
        background-color: #f5f6f7;
        border-top-color: transparent;
      }
      + tr td {
        border-top-color: transparent;
      }
    }
    &.MuiTableRow-hover {
      padding: 0 4px;
      cursor: pointer;

      :hover {
        border-radius: 8px;
        background-color: #fff;
        ${TableRowRadius};


        td,
        th {
          background-color: #f5f6f7;
          border-top-color: transparent;
        }
        + tr td {
          border-top-color: transparent;
        }
      }
    }
  }
`;

const StyledTableSortLabel = styled(TableSortLabel)`
  &.MuiTableSortLabel-root {
    font-size: 12px;
    width: 100%;

    :hover {
      color: #3023c8;
    }

    &.MuiTableSortLabel-active {
      color: #3023c8;
    }

    & .MuiTableSortLabel-icon {
      color: inherit !important;
      display: ${({ $sortable }) => ($sortable ? 'block' : 'none')};
    }
  }
`;

const StyledSortIndicator = styled('span')`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  top: 20px;
  width: 1px;

  & svg {
    padding: 4px 6px 4px 0;
  }
`;

export { StyledTable, StyledSortIndicator, StyledTableHead, StyledTableSortLabel, StyledTableRow, BreakpointTableCell };
