import React from 'react';
import styled from 'styled-components';
import { string, func, elementType } from 'prop-types';

/*
 * Disable automatic passing down of props
 * https://github.com/styled-components/styled-components/issues/135
 * */
export const MaterialIconStyler = styled(({ icon: Icon, className, onClick }) => (
  <Icon className={className} onClick={onClick} />
))`
  color: ${({ color }) => color};
  cursor: ${({ cursor }) => cursor};
  min-width: ${({ minWidth }) => minWidth};
  width: ${({ width }) => `${width}!important`};
  height: ${({ height }) => `${height}!important`};
  margin: ${({ margin }) => margin};
  transform: ${({ transform }) => transform || 'none'};
  ${({ fontSize }) => (fontSize ? `font-size: ${fontSize}!important` : '')}
`;

MaterialIconStyler.propTypes = {
  icon: elementType.isRequired,
  color: string,
  cursor: string,
  width: string,
  minWidth: string,
  height: string,
  margin: string,
  onClick: func,
};

MaterialIconStyler.defaultProps = {
  color: 'black',
  cursor: 'default',
  width: 'auto',
  minWidth: 'none',
  height: 'auto',
  margin: '0',
  onClick: () => null,
};
