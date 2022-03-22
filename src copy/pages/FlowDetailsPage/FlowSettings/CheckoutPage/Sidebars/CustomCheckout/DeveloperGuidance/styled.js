import styled, { css } from 'styled-components';
import THEME from '../../../../../../../constants/theme';

const StyledWrapper = styled.div`
  box-sizing: border-box;
  & > * {
    box-sizing: border-box;
  }
  margin-top: 44px;

  & > div,
  & > a {
    width: 100%;
    border-radius: 8px;
    position: relative;
    padding: 24px;

    &:not(:last-child) {
      margin-bottom: 24px;
      &::after {
        content: '';
        position: absolute;
        display: block;
        width: 22px;
        height: 22px;
        background: inherit;
        border-radius: 4px;
        bottom: -7px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        z-index: -1;
      }
    }
  }
`;

const StyledHeader = styled.div`
  background: ${THEME.primaryColors.black};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;

  & svg {
    transform: scale(1.2);
    margin-left: 12px;
  }
`;

const StyledCard = styled.a`
  background-color: ${THEME.greyColors.grey12};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 160px;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: ${THEME.primaryColors.primaryLight};
  }

  ${({ isChecked }) =>
    isChecked &&
    css`
      background-color: ${THEME.primaryColors.primaryLight};
    `}

  & .guidance__step_indicator {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    & .guidance__step_indicator__icon {
      width: 18px;
      height: 18px;
      background-color: ${THEME.greyColors.grey8};
      border-radius: 16px;
      margin-right: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      & div {
        width: 10px;
        transform: translate(-11px, 2px);

        svg {
          transform: scale(0.3);
          ${({ index }) =>
            index > 0 &&
            css`
              .check-path {
                animation-delay: ${`${index - 0.5}s !important`};
              }
            `}
          path {
            stroke: #fff;
            stroke-width: 5px;
          }
        }
      }
    }

    ${({ isChecked }) =>
      isChecked &&
      css`
        p {
          color: ${THEME.secondaryColors.greenDark};
        }
        & .guidance__step_indicator__icon {
          background-color: ${THEME.secondaryColors.greenDark};
        }
      `}
  }

  & .guidance__call-made-icon svg {
    margin-left: auto;
    color: #232629;
    font-size: 18px;
    stroke: #232629;
    stroke-width: 1px;
  }
`;

export { StyledWrapper, StyledHeader, StyledCard };
