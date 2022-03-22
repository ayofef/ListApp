import React from 'react';
import Box from '@material-ui/core/Box';
import { StyledTableCell, StyledMethodIcon } from './styled';
import { PROPTYPES } from './constant';
import { PAYMENT_METHOD_ICON_MAP } from '../../../assets/icons/PaymentMethods';

const MethodCell = ({ row: { original }, cell: { column } }) => {
  const header = column?.Header;
  const method = original[header];
  const Icon = PAYMENT_METHOD_ICON_MAP[method] ?? PAYMENT_METHOD_ICON_MAP.UNKNOWN_CARD;

  return (
    <StyledTableCell column={column} id={original?.id} align="center">
      <Box display="flex" justifyContent="flex-start" alignItems="center">
        <StyledMethodIcon component="span">
          <Icon />
        </StyledMethodIcon>
        <Box component="span" mb="4px" ml="8px">
          {method?.toUpperCase()}
        </Box>
      </Box>
    </StyledTableCell>
  );
};

MethodCell.propTypes = PROPTYPES;
export default MethodCell;
