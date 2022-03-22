import PropTypes from 'prop-types';
import React from 'react';
import ConfirmationModal from '../../../../../../components/modals/ConfirmationModal';

const MODAL_TEXT = (connectionName) => ({
  title: 'Confirm Change',
  description: `You are about to change your default processor to ${connectionName}. This may affect a lot of associated automations.`,
  submit: 'Confirm',
  cancel: 'Cancel',
});

const DESCRIPTION_PROPS = {
  width: '400px',
};

const SetDefaultConfirmationModal = ({ open, onConfirm, onCancel, connectionName, loading }) => {
  return (
    <ConfirmationModal
      open={open}
      onConfirm={onConfirm}
      onClose={onCancel}
      onCancel={onCancel}
      text={MODAL_TEXT(connectionName)}
      descriptionProps={DESCRIPTION_PROPS}
      loading={loading}
    />
  );
};

SetDefaultConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  connectionName: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SetDefaultConfirmationModal;
