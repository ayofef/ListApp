import styled from 'styled-components';
import { P14 } from './P14';

export const P14B = styled(P14)`
  font-weight: 600;
  white-space: ${({ whiteSpaceNoWrap }) => (whiteSpaceNoWrap ? 'nowrap' : 'normal')};
  margin: ${({ margin }) => margin ?? 'normal'};
`;
