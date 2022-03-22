import styled from 'styled-components';
import { customTextColor } from '../../../constants/CommonStyles';

export const H4 = styled.h4`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  ${customTextColor}
`;

export const TempH4 = styled(H4)`
  font-size: 20px;
  line-height: 25px;
`;
