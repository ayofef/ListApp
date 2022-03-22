import styled, { css, keyframes } from 'styled-components';

const POP_UP_ANIMATION = keyframes`
    from {
        transform: scale(0.9);
        opacity: 0;
        visibility: hidden;

    }to {
        transform: scale(1);
        opacity: 1;
        visibility: visible;
    }
`;

const POP_UP_CSS = css`
  animation: ${POP_UP_ANIMATION} 200ms cubic-bezier(0, 0.84, 0.61, 1.01);
`;

export const StyledWrapper = styled.div`
  box-sizing: border-box;
  width: 336px;

  ${POP_UP_CSS}
`;
