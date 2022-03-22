import styled, { css, keyframes } from 'styled-components';

const JIGGLE_FRAME = keyframes`
 from {
    transform: scale3d(1, 1, 1);
  }

  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`;

const ANIMATE = css`
  animation: ${JIGGLE_FRAME} 2s ease-out infinite;
`;

const StyledConfetti = styled.div`
  /* width: 300px; */
  position: absolute;
  top: 0;
  left: 0;

  svg {
    width: 100%;
  }
`;

const StyledPartyIcon = styled.div`
  margin-bottom: 24px;
  ${ANIMATE};

  svg {
    width: 100%;
  }
`;

export { StyledConfetti, StyledPartyIcon };
