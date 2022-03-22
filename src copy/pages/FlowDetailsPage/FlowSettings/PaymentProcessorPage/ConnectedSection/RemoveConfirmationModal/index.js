import PropTypes from 'prop-types';
import React from 'react';
import ConfirmationModal from '../../../../../../components/modals/ConfirmationModal';

const MODAL_TEXT = ({ connectionName, flowName }) => ({
  title: 'Confirm Change',
  description: `You are about to remove ${connectionName} from ${flowName}. This may affect a lot of associated automations.`,
  submit: 'Confirm',
  cancel: 'Cancel',
});

const DESCRIPTION_PROPS = {
  width: '400px',
};

const RemoveConfirmationModal = ({ open, onConfirm, onCancel, connectionName, flowName, loading }) => {
  return (
    <ConfirmationModal
      open={open}
      onConfirm={onConfirm}
      onClose={onCancel}
      onCancel={onCancel}
      text={MODAL_TEXT({ connectionName, flowName })}
      descriptionProps={DESCRIPTION_PROPS}
      loading={loading}
    />
  );
};

RemoveConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  connectionName: PropTypes.string.isRequired,
  flowName: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default RemoveConfirmationModal;
