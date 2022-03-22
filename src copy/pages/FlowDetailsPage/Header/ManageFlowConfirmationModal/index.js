import PropTypes from 'prop-types';
import React from 'react';
import ConfirmationModal from '../../../../components/modals/ConfirmationModal';
import { ACTION_KEY_MAP, MODAL_KEYS } from './constant';

const WARNING = ' Your automation will no longer run and you will lose any data related to this automation.';

const MODAL_TEXT = ({ flowName, modalKey }) => ({
  title: 'Confirm Change',
  description: `You are about to ${ACTION_KEY_MAP[modalKey]} ${flowName}. ${
    modalKey === MODAL_KEYS.discardChanges ? '' : WARNING
  } Are you sure you want to proceed?`,
  submit: 'Confirm',
  cancel: 'Cancel',
});

const DESCRIPTION_PROPS = {
  width: '400px',
};

const ManageFlowConfirmationModal = ({ open, onConfirm, onCancel, flowName, modalKey, loading }) => {
  return (
    <ConfirmationModal
      open={open}
      onConfirm={onConfirm}
      onClose={onCancel}
      onCancel={onCancel}
      text={MODAL_TEXT({ flowName, modalKey })}
      descriptionProps={DESCRIPTION_PROPS}
      loading={loading}
    />
  );
};

ManageFlowConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  flowName: PropTypes.string.isRequired,
  modalKey: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

ManageFlowConfirmationModal.defaultProps = {
  loading: false,
};

export default ManageFlowConfirmationModal;
