import styled from 'styled-components';
import { customTextColor } from '../../../constants/CommonStyles';

export const P142Lines = styled.p`
  position: relative;
  font-size: 14px;
  line-height: 18px;
  overflow: hidden;
  max-height: 36px;
  margin-right: -1em;
  padding-right: 1em;
  white-space: ${({ whiteSpaceNoWrap }) => (whiteSpaceNoWrap ? 'nowrap' : 'normal')};
  ${customTextColor};
`;
