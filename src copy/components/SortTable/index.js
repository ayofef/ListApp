import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { arrayOf, shape, func, string } from 'prop-types';
import { StyledTable, StyledTableRow } from './styled';
import HeadCell from './Cells/HeadCell';
import { getComparator, stableSort } from '../../utils/helpers';
import useSearchSort from '../../hooks/useSearchSort';
import { getOrderDataFromSearchParamsSort } from './helpers';

const SortTable = ({ headCells, rows, handleRowClick, cellPadding, minWidth }) => {
  const [order, handleRequestSort] = useSearchSort();
  const { order: orderKey, orderBy } = getOrderDataFromSearchParamsSort(order);
  const _rows = stableSort(rows, getComparator(orderKey, orderBy));

  return (
    <TableContainer>
      <StyledTable stickyHeader aria-label="basic-table" $cellPadding={cellPadding} $minWidth={minWidth}>
        <TableHead>
          <TableRow>
            {headCells.map(({ id, label, tooltip, sortable, width, disablePadding }) => (
              <HeadCell
                key={id}
                id={id}
                label={label}
                tooltip={tooltip}
                sortable={sortable}
                order={order}
                width={width}
                disablePadding={disablePadding}
                onRequestSort={(e, property) => handleRequestSort(property)}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {_rows.map((row, index) => {
            const labelId = `basic-table-row-${row.id}-${index}`;
            return (
              <StyledTableRow key={row.id} hover data-rowid={row.id} onClick={() => handleRowClick(row.id)}>
                {headCells.map(({ id, Cell }) => (
                  <Cell key={id} labelId={labelId} data={row[id]} fieldKey={id} rowId={row.id} />
                ))}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

SortTable.propTypes = {
  headCells: arrayOf(shape({})).isRequired,
  rows: arrayOf(shape({})).isRequired,
  cellPadding: string,
  handleRowClick: func,
  minWidth: string,
};

SortTable.defaultProps = {
  cellPadding: '16px 24px',
  handleRowClick: () => {},
  minWidth: '650px',
};

export default SortTable;
