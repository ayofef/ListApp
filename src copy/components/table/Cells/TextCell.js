import React from 'react';
import { StyledTableCell } from './styled';
import { PROPTYPES } from './constant';

const TextCell = ({ row: { original }, cell: { column } }) => {
  const header = column?.Header;

  return (
    <StyledTableCell column={column} id={original?.id}>
      {original[header]}
    </StyledTableCell>
  );
};

TextCell.propTypes = PROPTYPES;
export default TextCell;
