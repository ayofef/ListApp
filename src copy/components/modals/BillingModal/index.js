import React from 'react';
import { func, string, shape } from 'prop-types';
import FullScreenModalLayout from '../../layouts/FullScreenModalLayout';
import EditBillingCard from './EditBillingCard';

const BillingModal = ({ openType, onClose, editCard, cardData }) => {
  return (
    <FullScreenModalLayout onClose={onClose}>
      {openType === 'editCard' && <EditBillingCard onClose={onClose} editCard={editCard} cardData={cardData} />}
    </FullScreenModalLayout>
  );
};

BillingModal.propTypes = {
  openType: string.isRequired,
  onClose: func.isRequired,
  editCard: func.isRequired,
  cardData: shape({}).isRequired,
};

BillingModal.defaultProps = {};

export default BillingModal;
