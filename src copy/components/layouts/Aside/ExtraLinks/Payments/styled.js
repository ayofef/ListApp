import styled from 'styled-components';
import { H4 as H4Base } from '../../../../atoms';

const H4 = styled(H4Base)`
  font-family: Inter sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  font-weight: 600;
`;

const ErrorText = styled('p')`
  color: red;
  word-break: break-word;
`;

export { H4, ErrorText };
