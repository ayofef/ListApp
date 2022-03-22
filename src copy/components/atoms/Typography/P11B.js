import styled from 'styled-components';
import { customTextColor } from '../../../constants/CommonStyles';

export const P11B = styled.p`
  font-size: 11px;
  line-height: ${({ lineHeight = '15px' }) => lineHeight};
  font-weight: 500;
  ${customTextColor}
`;
