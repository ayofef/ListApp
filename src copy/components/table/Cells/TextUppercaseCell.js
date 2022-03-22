import React from 'react';
import { StyledTableCell } from './styled';
import { PROPTYPES } from './constant';

const TextUppercaseCell = ({ row: { original }, cell: { column } }) => {
  const header = column?.Header;
  return (
    <StyledTableCell column={column} id={original?.id}>
      {original[header]?.toUpperCase()}
    </StyledTableCell>
  );
};

TextUppercaseCell.propTypes = PROPTYPES;
export default TextUppercaseCell;
