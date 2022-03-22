import styled from 'styled-components';
import Slide from '@material-ui/core/Slide';
import THEME from '../../../constants/theme';

export const ModalFromRightWrap = styled.div`
  position: absolute;
  top: 0;
  box-shadow: 0 4px 4px rgba(132, 132, 132, 0.03), 0 2px 10px rgba(0, 0, 0, 0.06);
  background: #fff;
  z-index: 40;
  right: 0;
  width: 100%;
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}` : 'inherit')};
  min-height: 100vh;
  max-height: 100vh;
  padding: ${({ padding }) => padding || '40px'};
  overflow: auto;
  outline: none;
  @media (max-width: ${THEME.breakPoints.tablet}px) {
    padding: 20px;
  }
  &.simple {
    height: 100%;
    max-height: initial;
    min-height: auto;
    min-width: auto;
    position: static;
    border: none;
    background: ${THEME.greyColors.grey5};
  }
  &.filedrop-active {
    &:before {
      content: '';
      position: fixed;
      top: 0;
      right: 0;
      width: 480px;
      height: 100vh;
      border: 2px dashed grey;
      border-radius: 4px 0 4px 4px;
      background: rgb(255 255 255 / 90%);
      z-index: 12;
    }
  }
  .drop-active {
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    width: 480px;
    height: 100vh;
    align-items: center;
    justify-content: center;
    z-index: 13;
  }
  ${({ position }) => (position && `position: ${position};`) || ''}
  ${({ zIndex }) => (zIndex && `zIndex: ${zIndex};`) || ''}
  ${({ backgroundColor }) => (backgroundColor && `background-color: ${backgroundColor};`) || ''}
`;
export const Wrap = styled(Slide)`
  min-height: 100vh;
  right: 0;
  overflow: hidden;
  z-index: ${({ zIndex }) => zIndex || 1300};
  display: block;
  position: fixed;
  top: 0;
  width: 480px;
  @media (max-width: ${THEME.breakPoints.tablet}px) {
    width: 100%;
    max-width: 480px;
  }
  &.simple {
    position: static;
    width: 100%;
    height: 100%;
    min-height: auto;
    .info-request__header,
    .info-request__footer {
      background: transparent;
      &:after {
        background: transparent;
      }
    }
  }
`;

export const HeaderWrapper = styled.div`
  margin: ${({ margin }) => margin || '0 0 60px 0'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${({ padding }) => padding || '0'};
  & > span {
    display: flex;
    align-items: center;
  }
  & .modal-body__close {
    margin-left: 20px;
    cursor: pointer;
    border: 1px solid ${THEME.greyColors.grey4};
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;
