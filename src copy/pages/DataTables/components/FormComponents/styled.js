import styled from 'styled-components';

export const StyledGenerateIDButton = styled.button`
  background-color: #fff;
  border: none;
  outline: none;
  padding: 4px 6px 4px 0;
  transform: translateY(-8px);
  cursor: pointer;
  color: #4e40ef;
  transition: all 0.3s ease-out;
  font-size: 14px;
  &:hover {
    color: #3023c8;
  }
`;
export const StyledPhoneInput = styled.div`
  margin-bottom: 13px;

  input {
    height: 42px;
    border-color: #f5f6f7 !important;
    background-color: #f5f6f7 !important;
    transition: all 0.3s ease-out !important;

    &:hover {
      background-color: #ebecee !important;
    }
    &:focus {
      background-color: #fff !important;
      border-color: #4e40ef !important;
      box-shadow: 0 0 0 2px rgba(156, 160, 255, 0.3) !important;
    }
  }
  .arrow {
    display: none;
  }
`;
