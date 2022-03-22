import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';

import { GQL_SET_CHECKOUT_TYPE } from '../../../../utils/queries/flows/flowSettings/mutations';
import { usePaymentFlowContext } from '../../paymentFlowContext';
import { TOAST_TIMEOUT, TOAST_TITLE } from './useHandleAddToFlow';
import { CHECKOUT_DICTIONARY } from '../CheckoutPage/CheckoutType/constant';
import { isDefined } from '../../../../utils/helpers';

const CHECKOUT_SUCCESS_MAP = {
  [CHECKOUT_DICTIONARY.none]: 'none',
  [CHECKOUT_DICTIONARY.checkoutUiSdk]: 'WhenThen checkout ui',
  [CHECKOUT_DICTIONARY.customCheckout]: 'your custom checkout',
  [CHECKOUT_DICTIONARY.hostedCheckout]: 'WhenThen hosted checkout',
  [CHECKOUT_DICTIONARY.checkoutPlugin]: 'WhenThen checkout plugin',
};

const useSetCheckoutType = () => {
  const [setCheckoutType, { loading: _loading }] = useMutation(GQL_SET_CHECKOUT_TYPE);
  const { flow, setSaving, setFlow, refetch, refetchLoading } = usePaymentFlowContext();
  const { t } = useTranslation();
  const loading = _loading || refetchLoading;

  const handleSetCheckoutType = useCallback(
    async (checkoutType) => {
      setSaving(true);
      const flowId = flow?.id;

      try {
        const res = await setCheckoutType({
          variables: {
            flowId,
            checkoutType,
          },
        });

        if (!isEmpty(res?.errors)) {
          NotificationManager.error(t(res?.errors[0]?.message), t(TOAST_TITLE), TOAST_TIMEOUT);
          return;
        }

        if (isDefined(res?.data?.setCheckoutForPaymentFlow?.id)) {
          const successMessage = `Successfully updated your checkout type to ${CHECKOUT_SUCCESS_MAP[checkoutType]}`;

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
      }
    },
    [t, setCheckoutType, flow, setSaving, setFlow, refetch]
  );

  return { handleSetCheckoutType, loading };
};

export { useSetCheckoutType };
