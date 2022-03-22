import React, { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import { GQL_Q_LIST_PAYMENT_VIEW } from '../../../../utils/queries/payments/paymentsQueries';
import { REMOVE_USER_FROM_VIEW } from '../../../../utils/queries/payments/paymentsMutation';
import ConfirmationModal from '../../../modals/ConfirmationModal';

const mutateOptions = {
  refetchQueries: [{ query: GQL_Q_LIST_PAYMENT_VIEW }],
  awaitRefetchQueries: true,
};
const TOAST_TITLE = 'Saved View';
const TITLE = 'Are you sure you want to remove user from view?';

const DialogRemoveFromView = ({ open, viewId, viewName, userId, handleOnClose, userName }) => {
  const [removeUserFromView, { loading }] = useMutation(REMOVE_USER_FROM_VIEW, mutateOptions);
  const { t } = useTranslation();
  const handleRemove = useCallback(() => {
    removeUserFromView({ variables: { viewId, invitedUserId: userId } }).then(({ errors }) => {
      if (!isEmpty(errors)) {
        NotificationManager.error(errors?.[0]?.message, t(TOAST_TITLE), 5000);
        return;
      }
      NotificationManager.success(t(`Successfully removed ${userName} from ${viewName}`), t(TOAST_TITLE), 5000);
      handleOnClose();
    });
  }, [viewId, userId, removeUserFromView, t, userName, viewName, handleOnClose]);

  return (
    <ConfirmationModal
      loading={loading}
      open={open}
      onConfirm={handleRemove}
      onClose={handleOnClose}
      onCancel={handleOnClose}
      text={{
        title: TITLE,
        description: `You're about to remove ${userName} from ${viewName}.`,
        submit: 'Remove',
        cancel: 'Cancel',
      }}
    />
  );
};

DialogRemoveFromView.propTypes = {
  viewId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  handleOnClose: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};

export default DialogRemoveFromView;
