import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import React from 'react';
import { L12M } from '../atoms';

function EnhancedTableHead({ classes, order, orderBy, head, headCells = [], onRequestSort }) {
  return (
    <TableHead head={head} className={classes.tableHead}>
      <TableRow>
        {headCells.map((headCell) => {
          const isLabelComponent = typeof headCell.label === 'function';
          const Label = headCell.label;

          return (
            <TableCell
              key={headCell.id}
              head={head}
              className={`${classes.headCell} ${headCell.customClass}`}
              align={headCell.align}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <L12M>{isLabelComponent ? <Label onRequestSort={onRequestSort} /> : headCell.label}</L12M>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.shape({
    tableHead: PropTypes.string,
    headCell: PropTypes.string,
  }).isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  head: PropTypes.string.isRequired,
  headCells: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      customClass: PropTypes.string,
      align: PropTypes.string,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    })
  ).isRequired,
  onRequestSort: PropTypes.elementType,
};

EnhancedTableHead.defaultProps = {
  onRequestSort: PropTypes.elementType,
};

export default EnhancedTableHead;
