import { css } from 'styled-components';

export const customTypographyBase = css`
  color: ${({ $color }) => $color || '#000'};

  ${({ $margin }) => $margin && `margin: ${$margin}`};
  ${({ $padding }) => $padding && `padding: ${$padding}`};
  ${({ $fontSize }) => $fontSize && `font-size: ${$fontSize}`};
  ${({ $fontWeight }) => $fontWeight && `font-weight: ${$fontWeight}`};
  ${({ $fontFamily }) => $fontFamily && `font-family: ${$fontFamily} !important`};
  ${({ $textAlign }) => $textAlign && `text-align: ${$textAlign}`};
  ${({ $alignItems }) => $alignItems && `align-items: ${$alignItems}`};
  ${({ $lineHeight }) => $lineHeight && `line-height: ${$lineHeight}`};
  ${({ $transform }) => $transform && `transform: ${$transform}`};
`;
