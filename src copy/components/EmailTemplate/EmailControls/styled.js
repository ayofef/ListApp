import styled from 'styled-components';

export const StyledInputGroup = styled.label`
  display: flex;
`;

export const StyledFormGroup = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;

  & > :not(:last-child) {
    margin-bottom: 8px;
  }
`;
