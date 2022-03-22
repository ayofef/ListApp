import React from 'react';
import { func, bool, string } from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { ModalWrapper } from './styled';
import { AbsoluteBlock } from '../../atoms';
import { CloseIcon } from '../../../assets/icons';

const fullScreenStyleProp = { style: { height: '100vh', width: '100vw', maxHeight: '100vh', maxWidth: '100vw' } };

const SimpleModal = ({ fullScreen, open, handleClose, children, textAlign, showCloseButton, ...restProps }) => (
  <ModalWrapper
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    className="name"
    open={open}
    onClose={handleClose}
    textAlign={textAlign}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
    {...restProps}
  >
    <Fade in={open}>
      <div {...((fullScreen && fullScreenStyleProp) || {})} className="modal-body">
        {showCloseButton && (
          <AbsoluteBlock
            zIndex="2"
            cursor="pointer"
            top="20px"
            right="20px"
            onClick={handleClose}
            backgroundColor="#F5F6F7"
            borderRadius="30px"
            display="flex"
            justifyContent="center"
          >
            <CloseIcon stroke="#787F88" height="28px" width="28px" />
          </AbsoluteBlock>
        )}
        <div className="modal-body__content">{children}</div>
      </div>
    </Fade>
  </ModalWrapper>
);

SimpleModal.propTypes = {
  open: bool.isRequired,
  handleClose: func.isRequired,
  fullScreen: bool,
  textAlign: string,
  showCloseButton: bool,
};

SimpleModal.defaultProps = {
  fullScreen: false,
  textAlign: 'center',
  showCloseButton: true,
};

export default SimpleModal;
