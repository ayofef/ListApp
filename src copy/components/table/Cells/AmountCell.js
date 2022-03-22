import React from 'react';
import Box from '@material-ui/core/Box';
import { StyledTableCell } from './styled';
import { PROPTYPES } from './constant';

const AmountCell = ({ row: { original }, cell: { column } }) => {
  return (
    <StyledTableCell column={column} id={original?.id}>
      <Box component="span" fontWeight={600} color="#232629">
        {original?.amount}
      </Box>
    </StyledTableCell>
  );
};

AmountCell.propTypes = PROPTYPES;

export default AmountCell;
