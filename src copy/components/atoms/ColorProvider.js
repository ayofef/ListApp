import styled from 'styled-components';

export const ColorProvider = styled.span`
  color: ${({ color }) => color || 'inherit'};
  margin: ${({ margin }) => margin || '0'};
`;
