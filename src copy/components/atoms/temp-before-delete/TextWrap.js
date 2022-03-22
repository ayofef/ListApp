import styled from 'styled-components';

export const TextWrap = styled.div`
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : 'inherit')};
  margin: ${({ margin }) => margin || '0'};
`;
