import styled from 'styled-components';
import { customTextColor } from '../../../constants/CommonStyles';

export const P18 = styled.p`
  font-size: 18px;
  line-height: ${({ lineHeight }) => lineHeight || '32px'};
  ${customTextColor}
`;
