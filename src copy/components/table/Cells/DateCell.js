import React from 'react';
import moment from 'moment';
import { StyledTableCell } from './styled';
import { PROPTYPES, FORMATS } from './constant';

const DateCell = ({ row: { original }, cell: { column } }) => {
  const header = column?.Header;
  return (
    <StyledTableCell column={column} id={original?.id}>
      {moment(original[header]).calendar(FORMATS)}
    </StyledTableCell>
  );
};
DateCell.propTypes = PROPTYPES;
export default DateCell;
