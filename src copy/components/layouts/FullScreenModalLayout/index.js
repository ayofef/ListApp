import React, { useEffect } from 'react';
import { func, bool } from 'prop-types';
import { Header } from './styled';
import { Logo, CloseButton, BlockWrap, ModalWrapper } from '../../atoms';

const FullScreenModalLayout = ({ onClose, children, pageModal, ...restProps }) => {
  const setBodyName = (name) => {
    document.body.className = name.toString();
  };

  useEffect(() => {
    setBodyName('modal');
    return () => {
      setBodyName('');
    };
  }, []);

  return (
    <ModalWrapper {...restProps} className="pageModal">
      <BlockWrap flex={1} maxWidth="1212px" padding="20px 60px 80px" width="100%">
        {!pageModal ? (
          <Header>
            <Logo />
            <CloseButton className="fixed-close" onClick={onClose} />
          </Header>
        ) : (
          <Header margin="0">
            <CloseButton onClick={onClose} className="fixed-close" />
          </Header>
        )}
        {children}
      </BlockWrap>
    </ModalWrapper>
  );
};

FullScreenModalLayout.propTypes = {
  onClose: func.isRequired,
  pageModal: bool,
};

FullScreenModalLayout.defaultProps = {
  pageModal: false,
};

export default FullScreenModalLayout;
