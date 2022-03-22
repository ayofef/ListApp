import styled, { css } from 'styled-components';
import THEME from '../../../../../constants/theme';

export const StyledContentAreaWrapper = styled.div`
  width: calc(100% - 264px);
  height: 100%;
  display: block;
  position: relative;
  box-sizing: border-box;
  margin-top: 50px;
  min-height: 500px;
  ${({ $inModal }) =>
    $inModal &&
    css`
      margin: 0;
      padding: 50px 32px 0;
      border-left: 1px solid ${THEME.greyColors.grey5};
    `}
`;
