import styled, { css } from 'styled-components';
import THEME from '../../../../../constants/theme';

export const StyledBox = styled.div`
  padding: 6px 12px 6px 6px;
  transform: translateX(-6px);
  border-radius: 6px;
  transition: all 0.3s ease-out;
  display: flex;
  align-items: center;
  & p {
    transition: all 0.3s ease-out;
  }

  ${({ $allowHoverState }) =>
    $allowHoverState &&
    css`
      &:hover {
        background-color: #f5f2ff;
        & p {
          color: ${THEME.primaryColors.primary} !important;
        }
      }
    `}
`;
