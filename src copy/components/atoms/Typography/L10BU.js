import styled from 'styled-components';
import THEME from '../../../constants/theme';

export const L10BU = styled.p`
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ color }) => color || THEME.greyColors.grey9};
  margin: ${({ margin }) => margin || '10px 0'};
`;
