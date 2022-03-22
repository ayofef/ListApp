import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components';

const PaymentGatewaysWrapper = styled.div`
  display: block;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 16px;
`;

const paymentGatewayCardStyles = css`
  display: flex;
  background-color: #f5f6f7;
  min-width: 256px;
  min-height: 90px;
  padding: 12px 30px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e6e9ec;
  &:last-child {
    border-bottom: none;
  }
  div {
    display: flex;
    align-items: center;
  }
`;

const StyledPaymentGatewayCardLink = styled(Link)`
  ${paymentGatewayCardStyles}
  transition: all 0.3s ease-out;
  &:hover {
    background-color: #e6e9ec;
  }
`;

const StyledPaymentGatewayCard = styled.div`
  ${paymentGatewayCardStyles}
`;

export { StyledPaymentGatewayCardLink, StyledPaymentGatewayCard, PaymentGatewaysWrapper };
