import styled from 'styled-components';

export const AbsoluteBlock = styled.div`
  position: absolute;
  top: ${({ top }) => top || 'auto'};
  bottom: ${({ bottom }) => bottom || 'auto'};
  left: ${({ left }) => left || 'auto'};
  right: ${({ right }) => right || 'auto'};
  background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
  cursor: ${({ cursor }) => cursor || 'default'};
  ${({ display }) => display && `display: ${display}`};
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent}`};
  ${({ width }) => width && `width: ${width}`};
  ${({ height }) => height && `height: ${height}`};
  ${({ borderRight }) => borderRight && `border-right: ${borderRight}`};
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}`};
  ${({ borderLeft }) => borderLeft && `border-left: ${borderLeft}`};
  ${({ borderBottom }) => borderBottom && `border-bottom: ${borderBottom}`};
  ${({ borderTop }) => borderTop && `border-top: ${borderTop}`};
  ${({ transform }) => transform && `transform: ${transform}`};
  ${({ zIndex }) => zIndex && `z-index: ${zIndex}`};
  ${({ padding }) => padding && `padding: ${padding}`};
  ${({ boxShadow }) => boxShadow && `box-shadow: ${boxShadow}`};
  ${({ alignItems }) => alignItems && `align-items: ${alignItems}`};
`;
