import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';
import { SAVE_ATTACHMENTS, DELETE_ATTACHMENTS } from '../utils/queries/payments/paymentsMutation';
import { GET_PAYMENT_GQL } from '../utils/queries/payments/paymentsQueries';
import { TOAST_TIMEOUT, TOAST_UNEXPECTED_ERROR_MESSAGE } from '../constants/toasts';

const mutateOptions = (detailsId) => ({
  refetchQueries: [{ query: GET_PAYMENT_GQL(), variables: { id: detailsId } }],
  awaitRefetchQueries: true,
});

const TOAST_TITLE = 'Payment Attachment';

const useAddPaymentAttachment = (detailsId) => {
  const [saveAttachmentMutation] = useMutation(SAVE_ATTACHMENTS, mutateOptions(detailsId));

  const { t } = useTranslation();

  const handleError = useCallback(
    (message) => {
      NotificationManager.error(message, t(TOAST_TITLE), TOAST_TIMEOUT);
    },
    [t]
  );

  const mutatePaymentAttachment = (payloadObject) => {
    if (payloadObject) {
      saveAttachmentMutation({ variables: { attachments: payloadObject } }).then(({ errors }) => {
        if (errors) {
          errors.forEach(({ message }) => {
            handleError(message);
          });
        }
      });
    }
  };

  return { mutatePaymentAttachment };
};

const useDeletePaymentAttachment = (detailsId) => {
  const [deleteAttachmentMutation, { loading }] = useMutation(DELETE_ATTACHMENTS, mutateOptions(detailsId));
  const { t } = useTranslation();

  const deletePaymentAttachment = async (ID, callbackFn) => {
    try {
      const result = await deleteAttachmentMutation({ variables: { ID } });

      const hasError = !result.data?.deleteAttachment || !isEmpty(result.errors);

      if (hasError) {
        NotificationManager.error(
          t(result.errors[0]?.message || TOAST_UNEXPECTED_ERROR_MESSAGE),
          t(TOAST_TITLE),
          TOAST_TIMEOUT
        );
        return;
      }

      NotificationManager.success(t('Attachment successfully deleted'), t(TOAST_TITLE), TOAST_TIMEOUT);
    } catch {
      NotificationManager.error(t(TOAST_UNEXPECTED_ERROR_MESSAGE), t(TOAST_TITLE), TOAST_TIMEOUT);
    } finally {
      if (typeof callbackFn === 'function') {
        callbackFn();
      }
    }
  };

  return { deletePaymentAttachment, loading };
};

export { useAddPaymentAttachment, useDeletePaymentAttachment };
