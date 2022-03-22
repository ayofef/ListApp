import styled from 'styled-components';
import { customTextColor } from '../../../constants/CommonStyles';

export const L14 = styled.p`
  font-size: 14px;
  line-height: 24px;
  cursor: pointer;
  text-decoration: none;
  ${customTextColor};
  margin: ${({ margin }) => margin || ''};

  &:hover {
    text-decoration: ${({ noHover }) => (noHover ? 'none' : 'underline')};
  }
`;
