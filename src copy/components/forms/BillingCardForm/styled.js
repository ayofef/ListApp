import styled from 'styled-components';
import THEME from '../../../constants/theme';

export const BillingCardWrap = styled.div`
  height: 100%;
  width: 100%;
  .credit-input {
    display: inline-flex;
    input {
      font-size: 18px;
    }
  }
  .credit-nickname,
  .credit-name {
    width: 100%;
  }
  .credit-cardNumber {
    position: relative;
    width: 257px;
    width: calc(100% - 16px);
    width: calc(100% - 121px);
    margin-right: 16px;
    @media (max-width: ${THEME.breakPoints.mobile}px) {
      width: 100%;
    }
    svg {
      position: absolute;
      top: 18px;
      right: 10px;
      width: 40px;
      height: 40px;
    }
  }
  .credit-cvv {
    width: 105px;
    @media (max-width: ${THEME.breakPoints.mobile}px) {
      width: 100%;
    }
  }
  .credit-expiryDate {
    width: 145px;
    width: calc(100% - 232px);
    margin-right: 16px;
    @media (max-width: ${THEME.breakPoints.mobile}px) {
      width: 100%;
    }
  }
  .credit-zip {
    width: 216px;
    @media (max-width: ${THEME.breakPoints.mobile}px) {
      width: 100%;
    }
  }
`;
