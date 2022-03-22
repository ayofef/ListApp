import React from 'react';
import capitalize from '@material-ui/core/utils/capitalize';
import { StyledTableCell } from './styled';
import { PROPTYPES } from './constant';

const TextCapitalizeCell = ({ row: { original }, cell: { column } }) => {
  const header = column?.Header;
  return (
    <StyledTableCell column={column} id={original?.id}>
      {capitalize(original[header].toLowerCase())}
    </StyledTableCell>
  );
};

TextCapitalizeCell.propTypes = PROPTYPES;
export default TextCapitalizeCell;
