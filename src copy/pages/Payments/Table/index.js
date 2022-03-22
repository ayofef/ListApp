import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import { Checkbox } from '../../../components/atoms';
import useSearchSort from '../../../hooks/useSearchSort';
import { StyledTable, StyledTableHead, StyledTableRow } from '../../../components/table/styled';
import HeadCell from '../../../components/table/HeadCell';

const EnhancedTable = ({ rows, headCells }) => {
  const history = useHistory();
  const [selected, setSelected] = useState([]);
  const [order, handleRequestSort] = useSearchSort();
  const handleSelectAllClick = useCallback(
    (event) => {
      if (event.target.checked) {
        setSelected(rows.map((n) => n.id));
        return;
      }

      setSelected([]);
    },
    [rows, setSelected]
  );

  const handleSelect = useCallback(
    (event) => {
      event.stopPropagation();
      const id = event.currentTarget.dataset.rowid;

      setSelected((prevSelected) => {
        const selectedIndex = prevSelected.indexOf(id);
        /** @type Array<string> */
        let newSelected = [];

        if (selectedIndex === -1) {
          newSelected = newSelected.concat(prevSelected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(prevSelected.slice(1));
        } else if (selectedIndex === prevSelected.length - 1) {
          newSelected = newSelected.concat(prevSelected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(prevSelected.slice(0, selectedIndex), prevSelected.slice(selectedIndex + 1));
        }

        return newSelected;
      });
    },
    [setSelected]
  );

  const handleOnClick = useCallback(
    (event) => {
      event.stopPropagation();
      const id = event.currentTarget.dataset.rowid;
      const paymentId = event.currentTarget.dataset.rowpaymentid;
      const {
        location: { pathname, state, search },
      } = history;
      history.push({
        pathname: `${pathname}/details/${id}${paymentId ? `/payments/${paymentId}` : ''}`,
        state,
        search,
      });
    },
    [history]
  );

  const isSelected = useCallback((name) => selected.indexOf(name) !== -1, [selected]);
  const numSelected = selected.length;
  const rowCount = rows?.length;

  return (
    <TableContainer>
      <StyledTable aria-labelledby="tableTitle" size="small" aria-label="enhanced table">
        <StyledTableHead>
          <StyledTableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={handleSelectAllClick}
                aria-labelledby="select all desserts"
              />
            </TableCell>
            {headCells.map((headCell) => (
              <HeadCell
                key={headCell.id}
                id={headCell.id}
                order={order}
                label={headCell.label}
                disablePadding={headCell.disablePadding}
                onRequestSort={handleRequestSort}
                breakpoint={headCell.breakpoint}
              />
            ))}
          </StyledTableRow>
        </StyledTableHead>

        <TableBody>
          {rows?.map((row) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${row.id}`;

            return (
              <StyledTableRow
                key={row.id}
                hover
                onClick={handleOnClick}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                selected={isItemSelected}
                data-rowid={row.id}
                data-rowpaymentId={row.paymentId}
                resolved={row.resolved}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    name={labelId}
                    aria-labelledby={labelId}
                    onClick={handleSelect}
                    onChange={() => {}}
                    data-rowid={row.id}
                  />
                </TableCell>

                {headCells.map(({ id, Cell, breakpoint }) => (
                  <Cell
                    key={id}
                    labelId={labelId}
                    data={row[id]}
                    fieldKey={id}
                    rowId={row?.id}
                    paymentId={row?.paymentId}
                    assigneeUserId={row?.assigneeUserId?.id}
                    priority={row?.priority}
                    type={row?.type}
                    status={row?.status}
                    breakpoint={breakpoint}
                  />
                ))}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

EnhancedTable.propTypes = {
  headCells: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      Cell: PropTypes.func.isRequired,
      disablePadding: PropTypes.bool,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({})),
};
EnhancedTable.defaultProps = {
  rows: undefined,
};
export default EnhancedTable;
