import styled from 'styled-components';
import { customTextColor } from '../../../constants/CommonStyles';

export const L12B = styled.p`
  font-size: 12px;
  font-weight: 600;
  line-height: ${({ lineHeight }) => lineHeight || '16px'};
  text-transform: ${({ textTransform }) => textTransform || 'none'};
  padding: ${({ padding }) => padding || 'none'};
  ${customTextColor}
`;
