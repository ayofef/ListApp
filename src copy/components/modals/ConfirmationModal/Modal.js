import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';

export const ModalWrapper = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: ${({ textAlign }) => textAlign || 'center'};

  .MuiBackdrop-root {
    background-color: rgba(193, 195, 198, 0.4) !important;
  }
  .modal-body {
    background-color: #fff;
    width: 489px;
    height: ${({ height }) => height || '328px'};
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04), 0px 0px 14px rgba(0, 0, 0, 0.04);
    border-radius: 12px;
    overflow: hidden;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
