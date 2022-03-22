import PropTypes from 'prop-types';
import React from 'react';
import { TableBody as TableBodyWrapper, TableCell } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { usePaymentsHandler } from './hooks';
import { Checkbox } from '../atoms';
import { StyledTableRow } from '../table/styled';
import useTableContext from './TableContext';

const TableBody = ({ loaderRefFn }) => {
  const { getTableBodyProps, rows, prepareRow, checkboxEditMode } = useTableContext();

  const { handleOnClick, handleSelect, isSelected } = usePaymentsHandler({
    rows,
  });

  return (
    <TableBodyWrapper {...getTableBodyProps()}>
      {rows.map((row) => {
        const ID = row?.original?.id;
        const isItemSelected = isSelected(ID);
        const labelId = `enhanced-table-checkbox-${ID}`;
        prepareRow(row);

        return (
          <StyledTableRow
            {...row.getRowProps()}
            hover
            onClick={handleOnClick}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            selected={isItemSelected}
            data-rowid={ID}
            $checkboxEditMode={checkboxEditMode ? 1 : 0}
          >
            {!checkboxEditMode && (
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isItemSelected}
                  name={labelId}
                  aria-labelledby={labelId}
                  onClick={handleSelect}
                  onChange={() => {}}
                  data-rowid={ID}
                />
              </TableCell>
            )}

            {row.cells.map((cell) => {
              const key = cell.getCellProps();
              return <React.Fragment key={key?.key}>{cell.render('Cell')}</React.Fragment>;
            })}
          </StyledTableRow>
        );
      })}
      {/* Helper ref for useInfiniteHorizontalScroll */}
      {checkboxEditMode && (
        <Box
          visibility="hidden"
          opacity="0"
          height="100%"
          width="130px"
          ref={loaderRefFn}
          bgcolor="red"
          position="absolute"
          top="0"
          right="0"
        >
          &nbsp;
        </Box>
      )}
    </TableBodyWrapper>
  );
};

TableBody.propTypes = {
  loaderRefFn: PropTypes.func.isRequired,
};

export default TableBody;
