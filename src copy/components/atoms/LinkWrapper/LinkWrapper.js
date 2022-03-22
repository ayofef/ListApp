import styled, { css } from 'styled-components';
import THEME from '../../../constants/theme';

export const LinkWrapper = styled.a`
  color: ${({ color }) => color || `${THEME.primaryColors.primary}!important`};
  margin: ${({ margin }) => margin || '0'};
  display: ${({ display }) => display || 'inherit'};
  padding: ${({ padding }) => padding || '0'};
  cursor: ${({ cursor }) => cursor || 'pointer'};
  overflow: ${({ overflow }) => overflow || 'auto'};
  text-overflow: ${({ textOverflow }) => textOverflow || 'inherit'};
  white-space: ${({ whiteSpace }) => whiteSpace || 'inherit'};
  text-decoration: none;
  ${({ fontSize }) => fontSize && `font-size: ${fontSize}`};
  ${({ noUnderline }) =>
    noUnderline
      ? ''
      : css`
          &:hover {
            text-decoration: underline;
          }
        `}
  &.blue {
    color: ${`${THEME.primaryColors.blue}!important`};
  }

  &:hover {
    color: ${({ color }) => color || `${THEME.secondaryColors.secondary}`};
  }
`;
