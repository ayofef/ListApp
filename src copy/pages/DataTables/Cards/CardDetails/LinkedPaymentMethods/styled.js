import { Link } from 'react-router-dom';

import styled from 'styled-components';

const PaymentGatewaysWrapper = styled.div`
  display: block;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 16px;
`;

const StyledPaymentGatewayCard = styled(Link)`
  display: flex;
  background-color: #f5f6f7;
  transition: all 0.3s ease-out;
  min-width: 256px;
  min-height: 90px;
  padding: 12px 30px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e6e9ec;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #e6e9ec;
  }
  div {
    display: flex;
    align-items: center;
  }
`;

export { StyledPaymentGatewayCard, PaymentGatewaysWrapper };
