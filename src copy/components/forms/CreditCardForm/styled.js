import styled from 'styled-components';

export const CreditCardWrap = styled.div`
  width: 100%;
  height: 100%;
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
    margin-right: 16px;
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
  }
  .credit-expiryDate {
    width: 145px;
    margin-right: 16px;
  }
  .credit-zip {
    width: 216px;
  }
`;
