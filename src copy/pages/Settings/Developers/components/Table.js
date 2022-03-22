import React from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody/index';
import TableContainer from '@material-ui/core/TableContainer/index';
import useSearchSort from '../../../../hooks/useSearchSort';
import { StyledTable, StyledTableHead, StyledTableRow } from '../../../../components/table/styled';
import HeadCell from '../../../../components/table/HeadCell';

const EnhancedTable = ({ rows, headCells }) => {
  const [order] = useSearchSort();

  return (
    <TableContainer>
      <StyledTable aria-labelledby="tableTitle" size="small">
        <StyledTableHead>
          <StyledTableRow>
            {headCells.map((headCell) => (
              <HeadCell
                key={headCell.id}
                id={headCell.id}
                order={order}
                label={headCell.label}
                disablePadding={headCell.disablePadding}
                onRequestSort={() => null}
                sortable={false}
                width={headCell.width}
              />
            ))}
          </StyledTableRow>
        </StyledTableHead>

        <TableBody>
          {rows?.map((row) => {
            const labelId = `enhanced-table-checkbox-${row.id}`;

            return (
              <StyledTableRow
                key={row.id}
                hover
                data-rowid={row.id}
                data-rowpaymentid={row.id}
                $noCheckBox
                $lastRowBorder
              >
                {headCells.map(({ id, Cell }) => (
                  <Cell key={id} labelId={labelId} data={row[id]} fieldKey={id} rowId={row.id} paymentId={row.id} />
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
      width: PropTypes.string,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({})),
};
EnhancedTable.defaultProps = {
  rows: undefined,
};
export default EnhancedTable;
