import styled from 'styled-components';
import { string } from 'prop-types';

export const StyledImage = styled.img`
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : 'inherit')};
  margin: ${({ margin }) => margin || '0'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  opacity: ${({ opacity }) => opacity || '1'};
`;

StyledImage.propTypes = {
  maxWidth: string,
  width: string,
  height: string,
  margin: string,
  opacity: string,
};
