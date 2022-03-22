import styled from 'styled-components';
import THEME from '../../../constants/theme';

export const L10B = styled.p`
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 1px;
  margin: 0;
  color: ${({ color }) => color || THEME.greyColors.grey2};
`;
