import styled from 'styled-components';

const StyledSidebarWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 200px;
  margin-right: 32px;
  margin-top: 8px;

  @media screen and (max-width: 700px) {
    position: absolute;
    background-color: #fff;
    height: 100vh;

    margin-top: 0;
    margin-right: 0;

    top: 0;
    right: 0;

    z-index: 999;
    padding: 20px 16px 16px 16px;
    max-width: 250px;
    backdrop-filter: blur(10px);
    transition: all 0.2s ease-out;

    opacity: ${({ $menuIsOpen }) => ($menuIsOpen ? 1 : 0)};
    transform: ${({ $menuIsOpen }) => ($menuIsOpen ? 'translateX(0)' : 'translateX(100%)')};
  }
`;

const StyledListWrapper = styled.div`
  margin-top: 14px;

  & > :not(:last-child) {
    margin-bottom: 8px;
  }

  @media screen and (max-width: 700px) {
    max-height: calc(100vh - 260px);
    overflow-y: auto;
  }
`;

const StyledBackdrop = styled.div`
  width: 100vh;
  height: 100vh;
  position: fixed;
  z-index: 998;

  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.2);
  opacity: ${({ $menuIsOpen }) => ($menuIsOpen ? 1 : 0)};
  visibility: ${({ $menuIsOpen }) => ($menuIsOpen ? 'visible' : 'hidden')};
`;

export { StyledSidebarWrapper, StyledListWrapper, StyledBackdrop };
