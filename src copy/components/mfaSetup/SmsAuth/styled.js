import styled from 'styled-components';

export const OtpBlockCover = styled.div`
  margin-top: 16px;
  width: 100%;
`;

export const StyledPhoneInputWrapper = styled.div`
  margin-bottom: 24px;
  width: 100%;
  display: block;

  input {
    width: 100%;
    height: 42px;
    border-color: #f5f6f7 !important;
    background-color: #f5f6f7 !important;
    transition: all 0.3s ease-out !important;
    font-size: 14px !important;
    padding: 18.5px 14px 18.5px 48px !important;

    &:hover {
      background-color: #ebecee !important;
    }
    &:focus {
      border-color: #4e40ef !important;
      background-color: #fff !important;
      box-shadow: 0 0 0 2px rgba(156, 160, 255, 0.3) !important;
    }
  }
  & .react-tel-input {
    z-index: 999;
  }
  .arrow {
    display: none;
  }
  .flag {
    transform: scale(0.8);
  }
`;
