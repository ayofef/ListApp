import styled from 'styled-components';

export const StyledLogoText = styled.input`
  padding: 16px;
  outline: none;
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 500;
  color: ${({ accentColor }) => accentColor};
  border-radius: 8px;
  margin-left: ${({ fromImg }) => (fromImg ? '0' : '-16px')};
  padding-left: 16px;
  border: 1px dashed transparent;
  ${({ fromImg }) => fromImg && 'background-color: transparent'};
  :focus {
    border-color: ${({ editable, fromImg }) => (editable && !fromImg ? '#c1c3c6' : 'transparent')};
  }
`;

export const StyledText = styled.p`
  font-weight: 500;
  font-size: ${({ fontSize }) => fontSize};
  word-wrap: break-word;
  color: ${({ accentColor }) => accentColor};
  padding: ${({ padding }) => padding};
  display: block;
`;
