import styled, { css } from 'styled-components';

const StyledCardNumberWrapper = styled.div`
  position: relative;
  & .MuiOutlinedInput-input {
    padding-left: 44px !important;
  }
`;

const ICON_CSS = css`
  transition: 1s;
  backface-visibility: hidden;
  position: absolute;
  top: 22px;
  left: 4px;
  z-index: 999;
`;

const FrontIcon = styled.div`
  ${ICON_CSS};
  transform: ${({ flipped }) =>
    flipped ? 'rotateY(180deg) scale(0.7) translateY(-50%)' : 'scale(0.7) translateY(-50%)'};
`;
const BackIcon = styled.div`
  ${ICON_CSS};

  transform: ${({ flipped }) =>
    flipped ? 'rotateY(360deg) scale(0.7) translateY(-50%)' : 'rotateY(180deg) scale(0.7) translateY(-50%)'};
`;

export { StyledCardNumberWrapper, FrontIcon, BackIcon };
