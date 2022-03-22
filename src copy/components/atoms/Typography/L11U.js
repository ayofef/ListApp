import styled from 'styled-components';
import THEME from '../../../constants/theme';

export const L11U = styled.p`
  font-weight: bold;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ color }) => color || THEME.greyColors.grey2};
`;
