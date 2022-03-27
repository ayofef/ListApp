import styled from 'styled-components';
import Input from '../../../atoms/Input';

const StyledEditableField = styled(Input)`
  & .MuiInputBase-root {
    padding: 4px !important;

    font-size: ${({ $fontSize }) => `${$fontSize} !important`};
    font-weight: ${({ $fontWeight }) => `${$fontWeight} !important`};
    min-height: 32px;

    & fieldset {
      border: none !important;
      outline: none !important;
    }
  }
`;

const StyledEditableFieldWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &:last-child {
    margin-bottom: 16px;
  }
`;

const StyledEditableCheckBoxWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: ${({ $addRightMargin }) => $addRightMargin && '8px'};
  width: 100%;
  height: 100%;
  border-radius: 4px;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const StyledCheckboxWrapper = styled.div`
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 8px;
`;

export { StyledEditableField, StyledEditableFieldWrapper, StyledEditableCheckBoxWrapper, StyledCheckboxWrapper };
