import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import { GQL_ENABLE_PAYMENT_METHOD_FOR_FLOW } from '../../../../utils/queries/flows/flowSettings/mutations';
import { usePaymentFlowContext } from '../../paymentFlowContext';
import { TOAST_TIMEOUT, TOAST_TITLE } from './useHandleAddToFlow';
import { isDefined } from '../../../../utils/helpers';

const useEnablePaymentMethodsForPaymentFlow = () => {
  const { t } = useTranslation();
  const [setCheckoutType, { loading }] = useMutation(GQL_ENABLE_PAYMENT_METHOD_FOR_FLOW);
  const { flow, setSaving, setFlow } = usePaymentFlowContext();
  const handleEnablePaymentMethod = useCallback(
    async (connectionId, methods) => {
      setSaving(true);
      try {
        const res = await setCheckoutType({
          variables: {
            flowId: flow?.id,
            connectionId,
            methods,
          },
        });
        if (!isEmpty(res?.errors)) {
          NotificationManager.error(t(res?.errors[0]?.message), t(TOAST_TITLE), TOAST_TIMEOUT);
          return;
        }
        if (isDefined(res?.data?.enablePaymentMethodsForPaymentFlow)) {
          setFlow(res.data.enablePaymentMethodsForPaymentFlow);
          return;
        }
        NotificationManager.error(t('uiMessages.error'), t(TOAST_TITLE), TOAST_TIMEOUT);
      } catch {
        NotificationManager.error(t('uiMessages.error'), t(TOAST_TITLE), TOAST_TIMEOUT);
      } finally {
        setSaving(false);
      }
    },
    [t, setCheckoutType, flow, setSaving, setFlow]
  );

  return { handleEnablePaymentMethod, loading };
};

export { useEnablePaymentMethodsForPaymentFlow };
