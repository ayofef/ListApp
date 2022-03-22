import { css } from 'styled-components';
import THEME from './theme';

export const customTextColor = css`
  color: ${({ color }) => color || THEME.primaryColors.black};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
  opacity: ${({ opacity }) => opacity || '1'};
  min-height: ${({ minHeight }) => minHeight || 'auto'};
  cursor: ${({ cursor }) => cursor || 'inherit'};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize}`};
  ${({ fontWeight }) => fontWeight && `font-weight: ${fontWeight}`};
  ${({ fontFamily }) => fontFamily && `font-family: ${fontFamily} !important`};
  ${({ textAlign }) => textAlign && `text-align: ${textAlign}`};
  ${({ alignItems }) => alignItems && `align-items: ${alignItems}`};
  ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight}`};
  ${({ transform }) => transform && `transform: ${transform}`};
  white-space: ${({ whiteSpace }) => whiteSpace || 'normal'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  text-overflow: ${({ textOverflow }) => textOverflow || 'initial'};
  text-transform: ${({ textTransform }) => textTransform || 'none'};
  overflow: ${({ overflow }) => overflow || 'visible'};
  text-overflow: ${({ textOverflow }) => textOverflow || 'clip'};
  max-width: ${({ maxWidth }) => maxWidth || 'none'};
  letter-spacing: ${({ letterSpacing }) => letterSpacing || 'normal'};
  display: ${({ display }) => display || 'block'};
  text-transform: ${({ capitalize }) => (capitalize ? 'capitalize' : 'none')};
  white-space: ${({ noWrap }) => (noWrap ? 'nowrap' : 'none')};
  max-width: ${({ maxWidth }) => maxWidth || 'none'};
`;

export const borderStyling = css`
  border: ${({ border }) => border || 'none'};
  ${({ borderRight }) => borderRight && `border-right: ${borderRight}`};
  ${({ borderLeft }) => borderLeft && `border-left: ${borderLeft}`};
  ${({ borderBottom }) => borderBottom && `border-bottom: ${borderBottom}`};
  ${({ borderTop }) => borderTop && `border-top: ${borderTop}`};
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}`};
`;
