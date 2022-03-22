import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  padding: 0;
  margin: 0;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  outline: none;
  border: none;
  width: 51px;
  height: 51px;
  position: absolute;
  left: ${({ right }) => (right ? 'unset' : 'calc(100vw - 86px)')};
  z-index: 9999;
  top: ${({ top }) => top || 'calc(100vh - 695px)'};
  display: ${({ show }) => (show ? 'block' : 'none')};
  border-radius: 8px;
  transition: display 0.3s ease-out;
  transition-delay: ${({ show }) => (show ? '0' : '4s')};

  ${({ right }) =>
    right &&
    css`
      right: ${right};
    `};

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  & svg {
    width: 38px;
    transform: translateY(2px);
  }
`;

export { StyledButton };
