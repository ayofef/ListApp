import styled, { css } from 'styled-components';

import Button from '../../../../components/atoms/Buttons/Button';
import THEME from '../../../../constants/theme';
import { DATEPICKER_VARIANTS } from './constant';

export const StyledLabel = styled.span`
  font-size: 12px;
  font-weight: normal;
  margin-left: 10px;
`;
export const StyledButton = styled(Button)`
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0);
  transition: all 0.3s ease-out;
  min-height: unset;
  background-color: ${THEME.greyColors.grey12};
  margin: 0 0 10px 0;
  width: 100%;
  font-size: 12px;
  height: 32px;
  display: flex;
  align-items: center;

  ${({ open }) =>
    open &&
    css`
      background-color: #fff;
      border-color: #4e40ef;
      box-shadow: 0 0 2px 1px rgba(150, 160, 255, 0.2);
    `};
  &:hover {
    background-color: ${THEME.greyColors.grey5};
  }
  &:focus {
    border-color: #9ca0ff;
    background-color: #fff;

    box-shadow: 0 0 2px 1px rgba(150, 160, 255, 0.2);
  }
  ${({ $variant }) =>
    $variant === DATEPICKER_VARIANTS.monitor &&
    css`
      background-color: ${THEME.primaryColors.white};
      margin: 0;
      flex-direction: row-reverse;
      &:hover {
        background-color: ${THEME.primaryColors.white};
      }
      ${StyledLabel} {
        margin: 0;
        font-size: 14px;
      }
    `}
`;
