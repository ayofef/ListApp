import React from 'react';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import { StyledTableCell, StyledMethodIcon } from './styled';
import { PROPTYPES } from './constant';
import { PAYMENT_METHOD_ICON_MAP } from '../../../assets/icons/PaymentMethods';
import MaskedCard from '../../MaskedCard';

const StyledWrapper = styled(Box)`
  transform: translateY(4px);
`;
const StyledBox = styled(Box)`
  transform: translateY(-2.25px);
`;
const CardNumberCell = ({ row: { original }, cell: { column } }) => {
  const header = column?.Header;
  const cardNumber = original[header];
  const cardType = original['card brand'];
  const Icon = PAYMENT_METHOD_ICON_MAP[cardType] ?? PAYMENT_METHOD_ICON_MAP.UNKNOWN_CARD;

  return (
    <StyledTableCell column={column} id={original?.id} align="center">
      <StyledWrapper display="flex" justifyContent="flex-start" alignItems="center">
        <StyledBox>
          <StyledMethodIcon component="span">
            <Icon />
          </StyledMethodIcon>
        </StyledBox>

        <Box component="span" ml="8px" height="28px" overflow="hidden">
          <MaskedCard cardNumber={cardNumber} fontSize={14} />
        </Box>
      </StyledWrapper>
    </StyledTableCell>
  );
};

CardNumberCell.propTypes = PROPTYPES;
export default CardNumberCell;
