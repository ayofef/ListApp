import styled from 'styled-components';
import { customTextColor } from '../../../constants/CommonStyles';

export const P14Condensed = styled.p`
  font-size: 14px;
  line-height: 20px;
  white-space: ${({ whiteSpaceNoWrap }) => (whiteSpaceNoWrap ? 'nowrap' : 'normal')};
  padding: ${({ padding }) => padding || '0'};
  ${customTextColor}
`;
