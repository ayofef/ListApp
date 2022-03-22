import PropTypes from 'prop-types';
import React from 'react';
import ConfirmationModal from '../../../../../components/modals/ConfirmationModal';
import { MODAL_KEY } from './constant';

const MODAL_TEXT = ({ automationName, flowName, modalKey }) => ({
  title: 'Confirm Change',
  description: `You are about to ${MODAL_KEY[modalKey]} ${automationName} automation in ${flowName}.`,
  submit: 'Confirm',
  cancel: 'Cancel',
});

const DESCRIPTION_PROPS = {
  width: '400px',
};

const ManageConfirmationModal = ({ open, onConfirm, onCancel, automationName, flowName, modalKey, loading }) => {
  return (
    <ConfirmationModal
      open={open}
      onConfirm={onConfirm}
      onClose={onCancel}
      onCancel={onCancel}
      text={MODAL_TEXT({ automationName, flowName, modalKey })}
      descriptionProps={DESCRIPTION_PROPS}
      loading={loading}
    />
  );
};

ManageConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  automationName: PropTypes.string.isRequired,
  flowName: PropTypes.string.isRequired,
  modalKey: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ManageConfirmationModal;
