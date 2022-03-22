import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { useTranslation } from 'react-i18next';

import { P14, H3 } from '../../atoms';
import { StyledBox, StyledActions, StyledButton } from './styled';

const ModalWrapper = ({
  children,
  showModal,
  handleModal,
  title,
  handleCancel,
  handleSave,
  description,
  justifyButtons,
}) => {
  const { t } = useTranslation();

  return (
    <Modal open={showModal} onClose={handleModal} aria-labelledby={title} aria-describedby={title}>
      <StyledBox>
        <H3>{t(title)}</H3>
        <P14 color="#787F88" padding="10px 0 32px 0">
          {t(description)}
        </P14>
        {children}
        <StyledActions display="flex" justifyContent={justifyButtons} margin="32px 0 10px 0">
          <StyledButton type="button" variant="contained" color="secondary" onClick={handleCancel}>
            {t('Cancel')}
          </StyledButton>
          <StyledButton type="button" variant="contained" color="primary" onClick={handleSave}>
            {t('Save')}
          </StyledButton>
        </StyledActions>
      </StyledBox>
    </Modal>
  );
};

ModalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  showModal: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  justifyButtons: PropTypes.string,
};
ModalWrapper.defaultProps = {
  justifyButtons: 'flex-end',
};

export default ModalWrapper;
