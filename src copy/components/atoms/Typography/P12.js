import styled from 'styled-components';
import { customTextColor } from '../../../constants/CommonStyles';

export const P12 = styled.p`
  font-size: 12px;
  line-height: 16px;
  margin: ${({ margin }) => margin || 'auto'};

  ${customTextColor}
`;
