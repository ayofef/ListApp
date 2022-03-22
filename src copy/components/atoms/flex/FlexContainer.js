import styled from 'styled-components';
import { bool, oneOf, string } from 'prop-types';
import { borderStyling } from '../../../constants/CommonStyles';

export const FlexContainer = styled.div`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  flex-wrap: ${({ flexWrap }) => (flexWrap ? 'wrap' : 'nowrap')};
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  align-items: ${({ alignItems }) => alignItems || 'center'};
  ${({ alignSelf }) => (alignSelf && `align-self: ${alignSelf}`) || ''};
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  min-height: ${({ minHeight }) => minHeight || 'auto'};
  max-width: ${({ maxWidth }) => maxWidth || 'auto'};
  box-sizing: border-box;
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
  text-align: ${({ textAlign }) => textAlign || 'inherit'};
  flex: ${({ flex }) => flex || 'none'};
  position: ${({ position }) => position || 'relative'};
  background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
  border-radius: ${({ borderRadius }) => borderRadius || '0'};
  cursor: ${({ cursor }) => cursor || 'inherit'};
  opacity: ${({ opacity }) => opacity || '1'};
  box-shadow: ${({ boxShadow }) => boxShadow || 'none'};
  overflow: ${({ overflow }) => overflow || 'show'};
  ${({ left }) => left && `left: ${left}`};
  ${({ right }) => right && `right: ${right}`};
  ${({ top }) => top && `top: ${top}`};
  ${({ bottom }) => bottom && `bottom: ${bottom}`};
  ${({ zIndex }) => zIndex && `z-index: ${zIndex}`};
  ${borderStyling}
`;

FlexContainer.propTypes = {
  inline: bool,
  flexWrap: bool,
  flexDirection: oneOf(['row', 'row-reverse', 'column', 'column-reverse', 'inherit', 'initial', 'unset']),
  textAlign: string,
  backgroundColor: string,
  borderRadius: string,
  justifyContent: string,
  height: string,
  width: string,
  cursor: string,
  margin: string,
  opacity: string,
  maxWidth: string,
  alignItems: string,
  minHeight: string,
  padding: string,
  alignSelf: string,
  border: string,
  boxShadow: string,
  overflow: string,
};
