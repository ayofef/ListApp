import styled from 'styled-components';
import { customTextColor } from '../../../constants/CommonStyles';

export const P16 = styled.p`
  font-size: 16px;
  line-height: 25px;
  font-weight: ${({ fontWeight }) => fontWeight || '400'};
  ${customTextColor}
`;
