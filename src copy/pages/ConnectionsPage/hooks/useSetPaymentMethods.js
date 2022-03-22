import { useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';

import isEmpty from 'lodash/isEmpty';
import { GET_CONNECTION_DETAILS } from '../../../utils/queries/connections/connectionsQueries';
import { GQL_M_ENABLE_PAYMENT_METHODS } from '../../../utils/queries/connections/connectionsMutations';
import { isDefined } from '../../../utils/helpers';

const mutateOptions = (id) => ({
  ...(isDefined(id) && {
    refetchQueries: [{ query: GET_CONNECTION_DETAILS, variables: { id } }],
    awaitRefetchQueries: true,
  }),
  context: { skipGlobalHandling: true },
});

const TOAST_TITLE = 'Connection';
const TOAST_TIMEOUT = 5000;

const useSetPaymentMethods = ({ connectionId }) => {
  const { t } = useTranslation();
  const [enablePaymentMethods] = useMutation(GQL_M_ENABLE_PAYMENT_METHODS, mutateOptions(connectionId));

  const handleSetPaymentMethods = ({ methods, callback }) => {
    enablePaymentMethods({
      variables: { id: connectionId, methods },
    })
      .then((res) => {
        if (res && !isEmpty(res?.errors)) {
          NotificationManager.error(t(res?.errors[0]?.message), TOAST_TITLE, TOAST_TIMEOUT);
          return;
        }

        if (isDefined(res?.data?.enablePaymentMethods?.id)) {
          const successMessage = `Successfully enabled payment method${methods?.length > 1 ? 's' : ''}`;
          NotificationManager.success(t(successMessage), TOAST_TITLE, TOAST_TIMEOUT);
        } else {
          NotificationManager.error(t('Something went wrong'), TOAST_TITLE, TOAST_TIMEOUT);
        }
      })
      .finally(() => {
        if (typeof callback === 'function') {
          callback();
        }
      });
  };
  return { handleSetPaymentMethods };
};

export { useSetPaymentMethods };
