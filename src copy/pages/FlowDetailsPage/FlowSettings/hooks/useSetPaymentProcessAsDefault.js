import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';

import { GQL_SET_PROCESSOR_AS_DEFAULT } from '../../../../utils/queries/flows/flowSettings/mutations';
import { usePaymentFlowContext } from '../../paymentFlowContext';
import { TOAST_TIMEOUT, TOAST_TITLE } from './useHandleAddToFlow';
import { isDefined } from '../../../../utils/helpers';

const useSetPaymentProcessAsDefault = () => {
  const { t } = useTranslation();
  const { flow, setSaving, setFlow, refetch, refetchLoading } = usePaymentFlowContext();

  const [setAsDefault, { loading: _loading }] = useMutation(GQL_SET_PROCESSOR_AS_DEFAULT);

  const loading = _loading || refetchLoading;

  const handleSetAsDefault = useCallback(
    async (gatewayConnectionId, connectionName, callback) => {
      setSaving(true);

      try {
        const res = await setAsDefault({
          variables: {
            flowId: flow?.id,
            gatewayConnectionId,
          },
        });

        if (!isEmpty(res?.errors)) {
          NotificationManager.error(t(res?.errors[0]?.message), t(TOAST_TITLE), TOAST_TIMEOUT);
          return;
        }

        if (isDefined(res?.data?.setDefaultGatewayForPaymentFlow?.id)) {
          const successMessage = `Successfully set ${connectionName ?? 'payment processor'} as default on ${
            flow?.name
          }`;

          const refetchData = await refetch();

          if (!isEmpty(refetchData?.data?.getPaymentFlow)) {
            setFlow(refetchData?.data?.getPaymentFlow);
          }

          NotificationManager.success(t(successMessage), t(TOAST_TITLE), TOAST_TIMEOUT);
          return;
        }

        NotificationManager.error(t('uiMessages.error'), t(TOAST_TITLE), TOAST_TIMEOUT);
      } catch {
        NotificationManager.error(t('uiMessages.error'), t(TOAST_TITLE), TOAST_TIMEOUT);
      } finally {
        setSaving(false);
        if (typeof callback === 'function') {
          callback();
        }
      }
    },
    [t, setAsDefault, flow, setSaving, setFlow, refetch]
  );

  return { handleSetAsDefault, loading };
};

export { useSetPaymentProcessAsDefault };
