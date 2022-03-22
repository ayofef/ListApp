import styled from 'styled-components';
import THEME from '../../../constants/theme';

export const L11UM = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ color }) => color || THEME.greyColors.grey2};
`;
