import React from 'react';
import PropTypes from 'prop-types';
import TableSortLabel from './TableSortLabel';
import { StyledSortIndicator, BreakpointTableCell } from './styled';

const HeadCell = ({ id, order, label, disablePadding, onRequestSort, breakpoint, sortable, width }) => {
  const direction = order[id];
  const isActive = direction !== undefined;

  return (
    <BreakpointTableCell
      breakpoint={breakpoint}
      align="left"
      padding={disablePadding ? 'none' : 'default'}
      sortDirection={direction || false}
      width={width}
    >
      <TableSortLabel
        property={id}
        active={isActive}
        direction={direction || 'asc'}
        onRequestSort={onRequestSort}
        sortable={sortable}
      >
        {label}

        {isActive && (
          <StyledSortIndicator>{direction === 'desc' ? 'sorted descending' : 'sorted ascending'}</StyledSortIndicator>
        )}
      </TableSortLabel>
    </BreakpointTableCell>
  );
};

HeadCell.propTypes = {
  id: PropTypes.string.isRequired,
  breakpoint: PropTypes.string,
  order: PropTypes.objectOf(PropTypes.oneOf(['asc', 'desc'])).isRequired,
  label: PropTypes.node.isRequired,
  disablePadding: PropTypes.bool,
  sortable: PropTypes.bool,
  onRequestSort: PropTypes.func.isRequired,
  width: PropTypes.string,
};

HeadCell.defaultProps = {
  disablePadding: false,
  breakpoint: '',
  sortable: true,
  width: 'auto',
};

export default HeadCell;
