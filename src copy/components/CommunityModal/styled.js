import styled, { css, keyframes } from 'styled-components';
import THEME from '../../constants/theme';

const MODAL_ENTER = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }to {
    opacity: 1;
    transform: scale(1);
  }
`;
const BACKDROP_ENTER = keyframes`
  from {
    opacity: 0;
  }to {
    opacity: 1;
  }
`;

const MODAL_ANIMATION = css`
  animation: ${MODAL_ENTER} 200ms ease-out;
  animation-fill-mode: backwards;
  animation-delay: 100ms;
`;
const BACKDROP_ANIMATION = css`
  animation: ${BACKDROP_ENTER} 200ms ease-out;
  animation-fill-mode: backwards;
`;
export const CommunityModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  z-index: 9000;
  display: flex;
`;

export const CommunityModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(230, 233, 236, 0.8);
  opacity: 1;
  ${BACKDROP_ANIMATION};
`;

export const CommunityModalSpacer = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  min-height: 40px;
  flex: 0;
`;

export const CommunityModalBox = styled.div`
  position: relative;
  width: 424px;
  max-width: calc(100% - 32px);
  border-radius: 12px;
  box-sizing: border-box;
  color: white;
  margin-top: 40px;
  background: linear-gradient(340.21deg, #3158f1 5.99%, #6868fa 25.7%, #b45964 87.21%, #b36af7 124.67%);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04), (0px 10px 14px rgba(0, 0, 0, 0.04));
  padding: 42px 16px 16px;
  opacity: 1;
  transform: scale(1);
  ${MODAL_ANIMATION};

  h2 {
    margin-bottom: 15px;
    font-size: 32px;
    line-height: 32px;
    @media (min-width: ${THEME.breakPoints.desktop}px) {
      font-size: 40px;
      line-height: 40px;
    }
  }

  p {
    margin-bottom: 40px;
  }

  a {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    padding: 4px 8px;
    margin: 12px -8px;
    width: calc(100% + 16px);
    outline: none;
    box-sizing: border-box;
    border: 2px solid transparent;
    border-radius: 6px;

    &:focus-visible {
      border: 2px solid rgba(255, 255, 255, 0.2);
    }

    &:hover {
      img,
      span {
        opacity: 0.8;
      }
    }

    img,
    span {
      transition: 0.2s;
    }

    img {
      flex-shrink: 0;
    }
  }
`;

export const DividerLine = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
`;

export const CommunityModalCloser = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  padding: 10px 10px;
  cursor: pointer;
  outline: none;
  border: 2px solid rgba(white, 0);
  box-sizing: border-box;
  border-radius: 6px;

  img {
    display: block;
  }

  &:focus-visible {
    border: 2px solid rgba(white, 0.2);
  }
`;

export const CommunityModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
