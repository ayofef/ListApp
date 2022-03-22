import React, { useCallback } from 'react';
import { func, bool, shape, string } from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import { ButtonRounded, P16B, P14, BlockWrap, CircularLoader } from '../../atoms';
import { ModalWrapper } from './Modal';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const ConfirmationModal = ({
  open,
  onConfirm,
  onClose,
  onCancel,
  text,
  loading,
  descriptionProps,
  children,
  height,
}) => {
  const { t } = useTranslation();

  /**TODO - Investigate more - clicking on the modal body somehow bubbles or trigger another fn */
  const handleClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <ModalWrapper
      height={height}
      onClick={handleClick}
      open={open}
      onClose={onClose}
      $borderRadius="12px"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
    >
      <Box width="100%" className="modal-body" padding="0 32px" position="relative" overflow="hidden">
        {children || (
          <>
            <Box mb="10px">
              <P16B>{t(text.title)}</P16B>
            </Box>
            <P14 lineHeight="2.2" color="#545A61" {...(descriptionProps && { ...descriptionProps })}>
              {t(text.description)}
            </P14>
            <FlexContainer margin="32px 0 0">
              <BlockWrap margin="0 8px 0 0">
                <ButtonRounded onClick={onConfirm} color="primary" variant="contained" disabled={loading}>
                  {loading ? <CircularLoader size={20} bgcolor="#fff" /> : text.submit || t('buttonsText.Submit')}
                </ButtonRounded>
              </BlockWrap>
              <BlockWrap margin="0 0 0 0">
                <ButtonRounded onClick={onCancel} color="secondary" variant="contained">
                  {text.cancel || t('buttonsText.Cancel')}
                </ButtonRounded>
              </BlockWrap>
            </FlexContainer>{' '}
          </>
        )}
      </Box>
    </ModalWrapper>
  );
};

ConfirmationModal.propTypes = {
  open: bool.isRequired,
  onConfirm: func.isRequired,
  onClose: func.isRequired,
  onCancel: func.isRequired,
  text: shape({
    title: string.isRequired,
    description: string.isRequired,
    submit: string,
    cancel: string,
  }).isRequired,
  loading: bool,
  descriptionProps: shape({}),
  height: string,
};

ConfirmationModal.defaultProps = {
  loading: false,
  descriptionProps: undefined,
  height: undefined,
};

export default ConfirmationModal;
