import React from 'react';
import capitalize from '@material-ui/core/utils/capitalize';
import { StyledTableCell } from './styled';
import { PROPTYPES } from './constant';

const BoldTextCell = ({ row: { original }, cell: { column } }) => {
  const header = column?.Header;

  return (
    <StyledTableCell column={column} id={original?.id} bold>
      {capitalize(original[header])}
    </StyledTableCell>
  );
};

BoldTextCell.propTypes = PROPTYPES;
export default BoldTextCell;
