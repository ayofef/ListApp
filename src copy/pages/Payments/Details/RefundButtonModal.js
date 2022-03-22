import React, { useMemo } from 'react';
import { func, bool } from 'prop-types';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import ConfirmationModal from '../../../components/modals/ConfirmationModal';
import { REFUND_PAYMENT } from '../../../utils/queries/payments/paymentsMutation';
import { usePaymentsDetailsContext } from '../../DataTables/PaymentDetails/PaymentDetailsContext';

const TOAST_TIMEOUT = 5000;

const RefundButtonModal = ({ toggleShowModal, modalShown }) => {
  const { pageContentData, pageContentRefetch } = usePaymentsDetailsContext();
  const [refundPaymentInternal, { loading }] = useMutation(REFUND_PAYMENT);

  const { t } = useTranslation();
  const params = useParams();

  const handleRefund = () => {
    refundPaymentInternal({
      variables: {
        id: params?.detailsId,
      },
    }).then((res) => {
      if (res?.data?.refundPaymentInternal) {
        NotificationManager.success(t('payments.refundSuccessful'), t('uiMessages.success'), TOAST_TIMEOUT);
        pageContentRefetch();
      } else {
        NotificationManager.error('Server error', t('uiMessages.error'), TOAST_TIMEOUT);
      }
      toggleShowModal();
    });
  };

  const email = useMemo(() => pageContentData?.paymentCustomer?.value?.find((item) => item.key === 'email')?.value, [
    pageContentData,
  ]);

  return (
    <ConfirmationModal
      loading={loading}
      open={modalShown}
      onClose={toggleShowModal}
      onCancel={toggleShowModal}
      onConfirm={handleRefund}
      text={{
        title: 'Are you sure you want to refund payment?',
        description: `You're about to refund ${pageContentData?.amount?.value} to ${email}`,
        submit: 'Refund',
        cancel: 'Cancel',
      }}
    />
  );
};

export default RefundButtonModal;

RefundButtonModal.propTypes = {
  toggleShowModal: func.isRequired,
  modalShown: bool.isRequired,
};
