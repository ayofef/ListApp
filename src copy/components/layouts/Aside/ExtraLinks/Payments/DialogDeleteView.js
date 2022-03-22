import { useMutation } from '@apollo/client';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { matchPath, useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import ConfirmationModal from '../../../../modals/ConfirmationModal';
import { DELETE_PAYMENT_VIEW } from '../../../../../utils/queries/payments/paymentsMutation';
import { GQL_Q_LIST_PAYMENT_VIEW } from '../../../../../utils/queries/payments/paymentsQueries';
import { UI_ROUTES } from '../../../../../constants/routes';

const mutateOptions = {
  refetchQueries: [{ query: GQL_Q_LIST_PAYMENT_VIEW }],
  awaitRefetchQueries: true,
};

const TITLE = 'Are you sure you want to delete the saved view?';
const TOAST_TITLE = 'Delete saved view';
const TOAST_TIMEOUT = 5000;

const DialogDeleteView = ({ viewId, viewName, handleOnClose }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [deletePaymentView, { loading }] = useMutation(DELETE_PAYMENT_VIEW, mutateOptions);

  const confirmHandler = useCallback(() => {
    return deletePaymentView({ variables: { id: viewId } }).then(({ errors, data }) => {
      if (errors) {
        NotificationManager.error(t(errors?.[0]?.message), t(TOAST_TITLE), TOAST_TIMEOUT);

        return;
      }

      if (data) {
        const { location } = history;
        const match = matchPath(location.pathname, '/payments/views/:viewId');
        if (viewId === match?.params?.viewId) {
          history.replace(UI_ROUTES.payments);
        }

        NotificationManager.success(t(`${viewName} successfully deleted.`), t(TOAST_TITLE), TOAST_TIMEOUT);
        handleOnClose();
      }
    });
  }, [history, viewId, handleOnClose, deletePaymentView, viewName, t]);

  return (
    <ConfirmationModal
      loading={loading}
      open={Boolean(viewId)}
      onConfirm={confirmHandler}
      onClose={handleOnClose}
      onCancel={handleOnClose}
      text={{
        title: TITLE,
        description: `You're about to delete ${viewName}.`,
        submit: 'Delete',
        cancel: 'Cancel',
      }}
    />
  );
};

DialogDeleteView.propTypes = {
  viewId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  handleOnClose: PropTypes.func.isRequired,
};

export default DialogDeleteView;
