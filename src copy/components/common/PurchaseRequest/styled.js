import styled from 'styled-components';
import { Slide } from '@material-ui/core/';
import THEME from '../../../constants/theme';

export const InfoModalWrapper = styled.div`
  .info-request {
    &__photo {
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${THEME.primaryColors.white};
      overflow: hidden;
      img {
        max-width: 100%;
      }
      .empty-name {
        font-size: 30px;
        font-weight: bold;
      }
    }
    &__top-info {
    }
    &__buttons {
      margin: 22px 0 0;
    }
    &__list {
      padding: 0;
      li {
        list-style: none;
        &:not(:last-child) {
          padding-bottom: 20px;
        }
      }
    }
    &__card {
    }
    &__receipt {
    }
  }
  &.isEmpty {
    .empty-big {
      width: 160px;
      height: 16px;
      background: ${THEME.greyColors.grey3};
      margin-bottom: 18px;
    }
    .empty-small {
      width: 80px;
      height: 8px;
      background: ${THEME.greyColors.grey3};
      margin-bottom: 16px;
    }
    .empty-button {
      width: 125px;
      height: 48px;
      border-radius: 8px;
      background: ${THEME.greyColors.grey3};
      display: inline-block;
      &:not(:first-child) {
        margin-left: 16px;
      }
    }
  }
`;

export const ModalFromRightWrap = styled.div`
  position: fixed;
  top: 0;
  border: 1px solid #d1d1d1;
  background: #fff;
  z-index: 40;
  right: 0;
  min-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}` : 'inherit')};
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}` : 'inherit')};
  min-height: 100vh;
  max-height: 100vh;
  padding: 40px;
  overflow-y: auto;
`;
export const Wrap = styled(Slide)`
  min-height: 100vh;
  right: 0;
  z-index: 1300;
  display: block;
  position: fixed;
  top: 0;
  width: 480px;
  @media (max-width: ${THEME.breakPoints.tablet}px) {
    width: 100%;
    max-width: 320px;
  }
`;
export const HeaderWrapper = styled.div`
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  & > span {
    display: flex;
    align-items: center;
  }
  & .menu {
    margin-right: 20px;
  }
  & .modal-body__close {
    cursor: pointer;
  }
`;
