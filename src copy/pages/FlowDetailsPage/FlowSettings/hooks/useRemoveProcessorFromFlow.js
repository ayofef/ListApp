import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';

import { GQL_REMOVE_PROCESSOR_FROM_FLOW } from '../../../../utils/queries/flows/flowSettings/mutations';
import { usePaymentFlowContext } from '../../paymentFlowContext';
import { TOAST_TITLE, TOAST_TIMEOUT } from './useHandleAddToFlow';
import { isDefined } from '../../../../utils/helpers';
import { EXCEPTION_DICTIONARY } from '../../constant';

const useRemoveProcessorFromFlow = () => {
  const [removeProcessor, { loading: _loading }] = useMutation(GQL_REMOVE_PROCESSOR_FROM_FLOW, {
    context: { skipGlobalHandling: true },
  });
  const { setSaving, refetch, setFlow, flow, refetchLoading } = usePaymentFlowContext();
  const loading = _loading || refetchLoading;

  const { t } = useTranslation();

  const handleRemoveProcessor = useCallback(
    async (gatewayConnectionId, processorName, callback) => {
      setSaving(true);
      try {
        const res = await removeProcessor({
          variables: {
            flowId: flow?.id,
            gatewayConnectionId,
          },
        });

        if (!isEmpty(res?.errors)) {
          const translatedError = EXCEPTION_DICTIONARY[res?.errors?.[0]?.message] ?? res?.errors?.[0]?.message;

          NotificationManager.error(t(translatedError), t(TOAST_TITLE), TOAST_TIMEOUT);
          return;
        }

        if (isDefined(res?.data?.removeGatewayFromPaymentFlow?.id)) {
          const successMessage = `Successfully removed ${processorName} from ${flow?.name}`;
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
        if (typeof callback === 'function') {
          callback();
        }
        setSaving(false);
      }
    },
    [t, removeProcessor, setSaving, refetch, setFlow, flow?.name, flow?.id]
  );

  return { handleRemoveProcessor, loading };
};

export { useRemoveProcessorFromFlow };
