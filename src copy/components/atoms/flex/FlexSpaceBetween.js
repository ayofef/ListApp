import styled from 'styled-components';

export const FlexSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${({ margin }) => margin || '0'};
  width: ${({ width }) => width || '100%'};
`;
