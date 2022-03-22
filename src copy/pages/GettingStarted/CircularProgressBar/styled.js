import styled, { keyframes, css } from 'styled-components';
import THEME from '../../../constants/theme';

const PROGRESS_BAR_FRAMES = (n = 0) => keyframes`
  from {
    stroke-dashoffset: 10;
  } to {
    stroke-dashoffset: ${n};
  }
`;

const AnimateProgressBarCss = css`
  animation: ${({ $progress }) => PROGRESS_BAR_FRAMES($progress)} 1.5s ease-out;
`;

const StyledCircularProgressBar = styled.div`
  min-width: 48px;
  height: 48px;

  svg {
    position: relative;
    top: -1px;
    left: -1px;
  }

  .outer {
    stroke: ${THEME.greyColors.grey5};
    stroke-width: 4;
    fill: transparent;
  }

  .progress-bar {
    fill: url(#linear-gradient);
    stroke: url(#linear-gradient);
    fill-opacity: 0;
    stroke-width: 4;
    stroke-dasharray: 10;
    stroke-dashoffset: ${({ $progress }) => $progress || 0};
    stroke-linecap: round;
    transition: fill-opacity 0.5s linear;
    animation-fill-mode: backwards;
    ${AnimateProgressBarCss};
  }
`;

export { StyledCircularProgressBar };
