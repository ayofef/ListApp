import styled from 'styled-components';
import THEME from '../../../constants/theme';
import { BORDER_COLOR } from '../../FlowDetailsPage/constant';

const StyledStepLink = styled.a`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid ${BORDER_COLOR};
  cursor: pointer;
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  transition: 0.25s;
  &:hover {
    background: ${THEME.greyColors.grey14};
  }

  &.step:last-child {
    border-bottom: none;
  }

  .title {
    color: ${({ disabled }) => (disabled ? THEME.greyColors.grey1 : THEME.primaryColors.black)};
  }
`;

const AutomationBox = styled.div`
  width: 100%;

  ${({ completed }) =>
    completed &&
    `
    display: flex;
    align-items: center;
  `}
  /* padding: 24px; */
  border-bottom: 1px solid ${BORDER_COLOR};

  >* {

    >* {
      &:nth-child(3) {
        flex-shrink: 0;
        justify-self: flex-end;
      }

      p {
        max-width: 440px;
      }
    }
  }
  /* cursor: pointer;
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  transition: 0.25s;
  &:hover {
    background: ${THEME.greyColors.grey14};
  }

  &.step:last-child {
    border-bottom: none;
  }

  .title {
    color: ${({ disabled }) => (disabled ? THEME.greyColors.grey1 : THEME.primaryColors.black)};
  } */
`;

const IconContainer = styled.div`
  border-radius: 50%;
  border: 1px solid ${THEME.greyColors.grey5};
  padding: 6px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

export { StyledStepLink, IconContainer, AutomationBox };
