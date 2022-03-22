import styled from 'styled-components';
import { string, bool } from 'prop-types';

export const BlockWrap = styled.div`
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};
  align-self: ${({ alignSelf }) => alignSelf || 'auto'};
  max-width: ${({ maxWidth }) => maxWidth || 'none'};
  min-width: ${({ minWidth }) => minWidth || 'none'};
  display: ${({ display }) => display || 'block'};
  background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
  position: ${({ position }) => position || 'static'};
  cursor: ${({ cursor }) => cursor || 'inherit'};
  text-align: ${({ textAlign }) => textAlign || 'inherit'};
  border: ${({ border }) => border || 'none'};
  border-radius: ${({ borderRadius }) => borderRadius || '0'};
  flex: ${({ flex }) => flex || 'none'};
  ${({ overflow }) => overflow && `overflow: ${overflow}`};
  box-shadow: ${({ boxShadow }) => boxShadow || 'none'};
  & > svg {
    display: flex;
    align-items: center;
  }

  & > img {
    display: block;
  }
`;

BlockWrap.propTypes = {
  width: string,
  height: string,
  margin: string,
  padding: string,
  alignSelf: bool,
  maxWidth: string,
  backgroundColor: string,
  position: string,
  minWidth: string,
  display: string,
  cursor: string,
  borderRadius: string,
  textAlign: string,
};
