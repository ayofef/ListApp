import styled, { css } from 'styled-components';

const StyledDrawer = styled.div`
  position: fixed;
  left: 320px;
  right: 0;
  bottom: 0;

  height: 0;
  margin-left: auto;
  border: 1px solid #eaecee;
  border-top: none;
  padding: 14px 0 18px 32px;
  background-color: white;
  overflow: hidden;
  opacity: 0;
  box-shadow: inset 0 1px 0 #e6e9ec;
  z-index: 2;
  transition: 0.5s;
  transform: translateY(100%);

  ${({ open }) =>
    open &&
    css`
      height: auto;
      opacity: 1;
      transform: translateY(0);
    `}

  ${({ drawerOpen }) =>
    drawerOpen &&
    css`
      right: 329px;
    `}
`;

export { StyledDrawer };
