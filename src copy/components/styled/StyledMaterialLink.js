import styled from 'styled-components';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

export const StyledMaterialLink = styled(Link)`
  color: ${({ color }) => color || '#2346f2'};
  width: ${({ width }) => width || 'auto'};
  min-width: ${({ minWidth }) => minWidth || 'auto'};
  height: ${({ height }) => height || 'auto'};
  margin: ${({ margin }) => margin || '0'};
  font-size: ${({ fontSize }) => fontSize || '14px'};
  cursor: ${({ cursor }) => cursor || 'default'};
  ${({ textDecoration }) => (textDecoration && `text-decoration: ${textDecoration};`) || ''};
  ${({ display }) => (display && `display: ${display};`) || ''};
  ${({ justifyContent }) => (justifyContent && `justify-content:: ${justifyContent};`) || ''};
`;

StyledMaterialLink.propTypes = {
  color: string,
  fontSize: string,
  cursor: string,
  width: string,
  minWidth: string,
  height: string,
  margin: string,
  textDecoration: string,
  display: string,
  justifyContent: string,
};
