import styled, { css } from 'styled-components';
import THEME from '../../../../constants/theme';

const RESET_BUTTON = css`
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
`;

const StyledWrapper = styled.div`
  width: 100%;

  ul {
    padding: 0;
    margin: 0;
    & > :not(:last-child) {
      margin-bottom: 20px;
    }
    & > :last-child {
      margin-bottom: 40px;
    }

    li {
      list-style-type: none;
    }
  }
`;

const StyledButton = styled.button`
  ${RESET_BUTTON};
  padding: 2px 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s ease-out;
  color: #787f88;
  font-weight: 600;
  font-size: 14px;

  span {
    font-size: 14px;
    font-weight: 600;
    margin: 0 auto 0 18px;
    + svg {
      font-size: 20px;
      margin-right: 12px;
    }
  }

  &:hover {
    color: ${THEME.primaryColors.blue};
    svg {
      &.path path {
        stroke: ${THEME.primaryColors.blue} !important;
      }
      &.rect rect {
        fill: ${THEME.primaryColors.blue};
      }
    }
  }
`;

export { StyledWrapper, StyledButton, RESET_BUTTON };
