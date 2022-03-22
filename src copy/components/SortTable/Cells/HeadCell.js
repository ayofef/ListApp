import React from 'react';
import { string, node, bool, func, shape } from 'prop-types';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { StyledHeadCell } from '../styled';
import StyledTooltip from '../../styled/StyledTooltip';

const HeadCell = ({ id, label, tooltip, sortable, order, width, disablePadding, onRequestSort }) => {
  const direction = order[id];
  const isActive = direction !== undefined;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <StyledHeadCell
      id={id}
      align="left"
      sortDirection={direction || false}
      width={width}
      padding={disablePadding ? 'none' : 'default'}
    >
      <StyledTooltip title={tooltip}>
        {sortable ? (
          <TableSortLabel
            active={isActive}
            direction={direction}
            onClick={createSortHandler(id)}
            IconComponent={ArrowDropDown}
          >
            {label}
          </TableSortLabel>
        ) : (
          label
        )}
      </StyledTooltip>
    </StyledHeadCell>
  );
};

HeadCell.propTypes = {
  id: string.isRequired,
  order: shape({}),
  label: node,
  tooltip: string,
  sortable: bool,
  width: string,
  disablePadding: bool,
  onRequestSort: func,
};

HeadCell.defaultProps = {
  order: 'asc',
  label: '',
  tooltip: '',
  sortable: false,
  width: 'auto',
  disablePadding: false,
  onRequestSort: () => {},
};

export default HeadCell;
