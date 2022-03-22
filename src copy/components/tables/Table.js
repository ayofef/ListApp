import React, { useCallback, useState } from 'react';
import { func, arrayOf, shape, bool, number, string } from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import { StyledTableCell, useStyles } from './styled';
import EnhancedTableHead from './TableHead';
import ItemAttention from '../common/TableItems/ItemAttention';
import { useGlobalContext } from '../../containers/App/context';
import { getComparator, stableSort } from '../../utils/helpers';

export default function EnhancedTable({
  rows = [],
  displayedRows,
  displayAllRows,
  head,
  noBody,
  chooseRow,
  headCells,
  rowAction,
  rowType,
  buttonActions,
  selectedRows,
  setSelectedRows,
  attentionData,
  showAttention,
  canSelect,
  setCanSelect,
  hasAttention,
  appearance,
  defaultSort,
  ...restProps
}) {
  const classes = useStyles({ head, noBody });
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(defaultSort);
  const [page] = useState(0);
  const [dense] = useState(false);
  const [rowsPerPage] = useState(displayedRows);
  const { IS_TABLET } = useGlobalContext();

  const handleRequestSort = (event, property, sortOrder) => {
    setOrder(sortOrder);
    setOrderBy(property);
  };

  const handleClick = (e, id) => {
    chooseRow(id);
  };

  const getTableRows = () => {
    const _rows = stableSort(rows, getComparator(order, orderBy));
    return displayAllRows ? _rows : _rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  const renderAttentionRow = useCallback(
    (row, index) => {
      const attentionRow = hasAttention && (
        <TableRow
          key={`${index}-attention-${Math.random(10)}`}
          className={classes.cell}
          component="tr"
          scope="row"
          align="right"
        >
          <ItemAttention
            {...{
              ...row,
              attentionData,
              buttonActions,
              selectedRows,
              setSelectedRows,
              showAttention,
            }}
          />
        </TableRow>
      );
      return hasAttention ? attentionRow : null;
    },
    [attentionData, buttonActions, classes.cell, selectedRows, setSelectedRows, showAttention, hasAttention]
  );

  return (
    <div className={classes.wrap}>
      <Table
        className={`${classes.table} ${appearance}`}
        aria-labelledby="tableTitle"
        size={dense ? 'small' : 'medium'}
        aria-label="enhanced table"
        {...restProps}
      >
        {head !== 'none' && (
          <EnhancedTableHead
            head={head}
            classes={classes}
            order={order}
            headCells={headCells}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
        )}
        <TableBody head={head} className={classes.body}>
          {getTableRows().map((row, index) => {
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <React.Fragment key={row.id}>
                <TableRow
                  hover
                  key={row.id}
                  head={head}
                  className={`${classes.row} ${appearance}`}
                  onClick={(event) => {
                    rowAction(row, rowType);
                    handleClick(event, row.id);
                  }}
                  role="checkbox"
                  tabIndex={-1}
                >
                  {headCells.map((item) => (
                    <StyledTableCell
                      key={item.id}
                      className={`${classes.cell} ${appearance} ${item.customClass}`}
                      component={item.long && 'th'}
                      id={labelId}
                      scope="row"
                      width={item.width}
                      align={item.align || 'right'}
                      minWidth={!IS_TABLET && item.minWidth}
                    >
                      {item.id !== 'attention' &&
                        item.componentRender({
                          ...row,
                          attentionData,
                          buttonActions,
                          selectedRows,
                          setSelectedRows,
                          canSelect,
                          setCanSelect,
                        })}
                    </StyledTableCell>
                  ))}
                </TableRow>
                {showAttention?.id === row.id && renderAttentionRow(row, index)}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
EnhancedTable.propTypes = {
  rows: arrayOf(shape({})).isRequired,
  displayedRows: number,
  displayAllRows: bool,
  head: string,
  noBody: bool,
  headCells: arrayOf(shape({})).isRequired,
  chooseRow: func,
  rowAction: func,
  buttonActions: shape({}),
  rowType: string,
  selectedRows: arrayOf(shape({})),
  setSelectedRows: func,
  attentionData: shape({}),
  showAttention: shape({}),
  canSelect: bool,
  setCanSelect: func,
  hasAttention: bool,
  appearance: string,
  defaultSort: string,
};

EnhancedTable.defaultProps = {
  chooseRow: () => false,
  rowAction: () => false,
  head: null,
  buttonActions: {},
  rowType: '',
  displayedRows: 10,
  displayAllRows: false,
  noBody: false,
  selectedRows: [],
  setSelectedRows: () => false,
  attentionData: {},
  showAttention: {},
  canSelect: false,
  setCanSelect: () => false,
  hasAttention: false,
  appearance: 'default',
  defaultSort: null,
};
