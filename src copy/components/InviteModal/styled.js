import styled from 'styled-components';
import { ReactMultiEmail } from 'react-multi-email';
import { L12 } from '../atoms';

const StyledMultiMailInput = styled(ReactMultiEmail)`
  background: #f5f6f7 !important;
  border-radius: 6px;
  border: none !important;
  outline: none !important;
  padding: 8px 12px !important;
  min-height: 136px;
  box-sizing: border-box;

  & > span[data-placeholder] {
    padding: 8px 12px;
  }

  & > input {
    background-color: rgba(255, 255, 255, 0);
    min-width: 160px;
  }
`;

const StyledInputTag = styled.div`
  overflow-wrap: break-word !important;
  word-wrap: break-word !important;
  hyphens: auto !important;
  justify-content: space-between !important;
  color: #787f88 !important;
  font-weight: 600 !important;
  font-size: 12px !important;
  line-height: 20px !important;
  background-color: #fff !important;
  border-radius: 4px !important;
  padding: 4px 8px !important;
  margin-right: 4px !important;
  border: 1px solid #e6e9ec;
`;
const StyledRemoveButton = styled.button`
  margin: 0;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0);
  margin-left: auto;
  padding: 2px 6px;
  color: #787f88 !important;
  line-height: 1;
  transform: scale(1.2);
`;

const StyledError = styled(L12)`
  margin-top: 2px;
`;

export { StyledMultiMailInput, StyledRemoveButton, StyledInputTag, StyledError };
