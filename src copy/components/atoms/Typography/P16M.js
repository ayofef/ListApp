import styled from 'styled-components';
import { P16 } from './P16';
import { customTextColor } from '../../../constants/CommonStyles';

export const P16M = styled(P16)`
  font-weight: 500;
  padding: ${({ padding }) => padding || '0'};
  ${customTextColor}
`;
