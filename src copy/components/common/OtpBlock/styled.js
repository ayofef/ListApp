import styled from 'styled-components';
import THEME from '../../../constants/theme';

export const OtpFields4 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    > div {
      width: calc(25% - 12px) !important;
    }
  }
  input {
    width: 100% !important;
    height: 72px !important;
    border-radius: 6px;
    font-size: 24px;
    font-weight: 500;
    outline: none;
    box-sizing: border-box;
    border: 1px solid #f5f6f7;
    background: #f5f6f7;

    &:focus {
      border: 1px solid;
      border-color: ${THEME.primaryColors.primary};
      background: white;
      box-shadow: 0 0 0 2px #f5f2ff;
    }
  }
`;

export const OtpFields6 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    > div {
      width: calc(15% - 5px) !important;
    }
  }
  input {
    width: 100% !important;
    height: 48px !important;
    border-radius: 6px;
    font-size: 18px;
    font-weight: 500;
    outline: none;
    box-sizing: border-box;
    border: 1px solid #f5f6f7;
    background: #f5f6f7;

    &:focus {
      border: 1px solid;
      border-color: ${THEME.primaryColors.primary};
      background: white;
      box-shadow: 0 0 0 2px #f5f2ff;
    }
  }
`;

export const OtpFields = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    > div {
      width: calc(25% - 18px) !important;
    }
  }
  input {
    width: 100% !important;
    height: 80px !important;
    outline: none;
    border-radius: 8px;
    box-sizing: border-box;
    border: 1px solid ${THEME.greyColors.grey4};

    &:focus {
      border: 1px solid;
      border-top-color: #8672d3;
      border-right-color: #4611f8;
      border-bottom-color: #5740fa;
      border-left-color: #bb7c8f;
    }
  }
`;
