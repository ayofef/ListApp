import styled, { css } from 'styled-components';
import { customTextColor } from '../../../constants/CommonStyles';

export const H3 = styled.h3`
  font-weight: 500;
  font-size: 24px;
  line-height: 37px;
  ${customTextColor}
  ${({ center }) => {
    return (
      center &&
      css`
        display: flex;
        align-items: center;
      `
    );
  }}
  a {
    text-decoration: none;
    ${customTextColor}
    cursor: pointer;
  }
`;
