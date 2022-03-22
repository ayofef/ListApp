import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import THEME from '../../../constants/theme';

export const ModalWrapper = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: ${({ textAlign }) => textAlign || 'center'};

  .MuiBackdrop-root {
    background-color: rgba(193, 195, 198, 0.4) !important;
  }
  .modal-body {
    position: relative;
    width: 100%;
    max-width: 719px;
    overflow: auto;
    height: ${({ height }) => height || 'auto'};
    min-height: 328px;
    max-height: calc(100vh - 80px);
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(132, 132, 132, 0.03), 0px 2px 10px rgba(0, 0, 0, 0.06);
    border: none;
    border-radius: 4px;
    ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}`};
    ${({ width }) => width && `width: ${width}`};
    ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth}`};

    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &__close {
      position: sticky;
      top: 32px;
      right: 40px;
      margin-left: auto;
      cursor: pointer;
      z-index: 1;
    }
    &__content {
      width: 100%;
      padding: ${({ padding }) => padding || '75px'};
      height: ${({ height }) => height || 'auto'};
      overflow: auto;
    }
    @media (max-width: ${THEME.breakPoints.mobile}px) {
      width: 100%;
      height: 100%;
      max-height: 100%;
      &__close {
        transform: scale(0.7);
        top: 20px;
        right: 20px;
      }
      &__content {
        height: 100%;
        padding: 40px;
      }
    }
  }
`;
