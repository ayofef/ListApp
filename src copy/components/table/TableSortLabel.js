import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { StyledTableSortLabel } from './styled';

const TableSortLabel = ({ property, active, direction, children, onRequestSort, sortable }) => {
  const onClickHandler = useCallback(() => {
    onRequestSort(property);
  }, [property, onRequestSort]);

  return (
    <StyledTableSortLabel
      active={active}
      direction={direction}
      onClick={onClickHandler}
      IconComponent={KeyboardArrowDownIcon}
      $sortable={sortable}
    >
      {children}
    </StyledTableSortLabel>
  );
};

TableSortLabel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  property: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  direction: PropTypes.oneOf(['desc', 'asc']).isRequired,
  onRequestSort: PropTypes.func.isRequired,
  sortable: PropTypes.bool,
};

TableSortLabel.defaultProps = {
  sortable: true,
};

export default TableSortLabel;
