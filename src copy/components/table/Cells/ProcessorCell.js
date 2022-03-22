import React from 'react';
import { StyledTableCell } from './styled';
import { PROPTYPES } from './constant';
import Processor from '../Processor';

const ProcessorCell = ({ row: { original }, cell: { column } }) => {
  const header = column?.Header;
  const logoObj = original[header];
  return (
    <StyledTableCell column={column} id={original?.id} align="center">
      <Processor name={logoObj?.name} logo={logoObj?.logo} />
    </StyledTableCell>
  );
};

ProcessorCell.propTypes = PROPTYPES;
export default ProcessorCell;
