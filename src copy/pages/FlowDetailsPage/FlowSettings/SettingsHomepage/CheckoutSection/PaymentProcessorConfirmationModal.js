import PropTypes from 'prop-types';
import React from 'react';
import ConfirmationModal from '../../../../../components/modals/ConfirmationModal';

const MODAL_TEXT = {
  title: 'Payment Processor Missing',
  description: 'In order to configure a checkout, you need to connect a payment processor.',
  submit: 'Connect',
  cancel: 'Cancel',
};

const DESCRIPTION_PROPS = {
  width: '300px',
};

const PaymentProcessorConfirmationModal = ({ open, onConfirm, onCancel }) => {
  return (
    <ConfirmationModal
      open={open}
      onConfirm={onConfirm}
      onClose={onCancel}
      onCancel={onCancel}
      text={MODAL_TEXT}
      descriptionProps={DESCRIPTION_PROPS}
    />
  );
};

PaymentProcessorConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default PaymentProcessorConfirmationModal;
