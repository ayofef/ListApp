import styled from 'styled-components';
import { customTextColor } from '../../../constants/CommonStyles';

export const L12 = styled.p`
  font-size: 12px !important;
  line-height: 16px !important;
  ${customTextColor};
  margin: ${({ margin }) => margin || '0'};
  display: ${({ display }) => display || 'block'};
  ${({ textAlign }) => textAlign && `text-align: ${textAlign}`}
  ${({ fontWeight }) => fontWeight && `font-weight: ${fontWeight}`}
`;
