import styled from 'styled-components';

export const FlexEnd = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin: ${({ margin }) => margin || '0'};
  align-items: center;
`;
