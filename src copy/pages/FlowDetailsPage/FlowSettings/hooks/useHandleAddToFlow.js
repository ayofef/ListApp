import { useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';

import { GQL_ADD_PROCESSOR_TO_FLOW } from '../../../../utils/queries/flows/flowSettings/mutations';
import { usePaymentFlowContext } from '../../paymentFlowContext';
import { isDefined } from '../../../../utils/helpers';
import { GET_PAYMENT_FLOW_FOR_GATEWAYS } from '../../../../utils/queries/flows/flowsQueries';
import { GET_FLOW, GET_FLOW_STEP_LIBRARY } from '../../../../utils/queries/flows/queries';
import { GET_CONNECTIONS } from '../../../../utils/queries/connections/connectionsQueries';

const TOAST_TIMEOUT = 5000;
const TOAST_TITLE = 'Flow Settings';
const CONNECTION_ID_PREFIX = 'connection-provider:';

const getConnections = GET_CONNECTIONS.definitions[0].name.value;
const flowStepLibrary = GET_FLOW_STEP_LIBRARY.definitions[0].name.value;
const paymentFlowForGateways = GET_PAYMENT_FLOW_FOR_GATEWAYS.definitions[0].name.value;
const getFlow = GET_FLOW.definitions[0].name.value;

function useAddProcessor() {
  const [addToFlow, { loading }] = useMutation(GQL_ADD_PROCESSOR_TO_FLOW, {
    refetchQueries: [getConnections, flowStepLibrary, paymentFlowForGateways, getFlow],
    context: {
      skipGlobalHandling: true,
    },
  });
  const { t } = useTranslation();

  const prepareParamsAndRun = async (params, flowId) => {
    const id = typeof params === 'string' ? params : params?.currentTarget?.dataset?.id;
    const parsedId = id.includes(CONNECTION_ID_PREFIX) ? id : `${CONNECTION_ID_PREFIX}${id}`;
    const res = await addToFlow({
      variables: {
        flowId,
        gatewayConnectionId: parsedId,
      },
    });

    if (!isEmpty(res?.errors)) {
      NotificationManager.error(t(res?.errors[0]?.message), t(TOAST_TITLE), TOAST_TIMEOUT);
      return null;
    }
    return res;
  };

  return {
    prepareParamsAndRun,
    loading,
  };
}

const useHandleNoEditorAddConnection = ({ flowId, closeModal }) => {
  const { prepareParamsAndRun, loading } = useAddProcessor({ flowId });
  const { t } = useTranslation();

  const handleAddToFlow = async (params) => {
    /**
     * id - scenarios
     * 1 - if id is passed directly <string> - use the Id
     * 2 - If it's not a string - definitely triggered by a button so get Id from event object
     *
     * parseID - scenarios
     * id from connect mutation doesn't have CONNECTION_ID_PREFIX
     * add the prefix if it not currently included
     */

    params?.stopPropagation?.();
    try {
      closeModal();
      await prepareParamsAndRun(params, flowId);
    } catch (e) {
      NotificationManager.error(t('uiMessages.error'), t(TOAST_TITLE), TOAST_TIMEOUT);
    }
  };

  return { handleAddToFlow, loading };
};

const useHandleAddToFlow = () => {
  const { flow, setSaving, setFlow, refetch, refetchLoading } = usePaymentFlowContext();
  const { prepareParamsAndRun, loading: _loading } = useAddProcessor();
  const { t } = useTranslation();
  const loading = _loading || refetchLoading;

  const handleAddToFlow = async (params) => {
    /**
     * id - scenarios
     * 1 - if id is passed directly <string> - use the Id
     * 2 - If it's not a string - definitely triggered by a button so get Id from event object
     *
     * parseID - scenarios
     * id from connect mutation doesn't have CONNECTION_ID_PREFIX
     * add the prefix if it not currently included
     */

    params?.stopPropagation?.();
    setSaving(true);

    try {
      const res = await prepareParamsAndRun(params, flow?.id);

      if (isDefined(res?.data?.enableGatewayForPaymentFlow?.id)) {
        const successMessage = `Successfully added payment processor to ${flow?.name}`;

        const refetchData = await refetch();

        if (!isEmpty(refetchData?.data?.getPaymentFlow)) {
          setFlow(refetchData?.data?.getPaymentFlow);
        }
        NotificationManager.success(t(successMessage), t(TOAST_TITLE), TOAST_TIMEOUT);
        return;
      }

      NotificationManager.error(t('uiMessages.error'), t(TOAST_TITLE), TOAST_TIMEOUT);
    } catch (e) {
      NotificationManager.error(t('uiMessages.error'), t(TOAST_TITLE), TOAST_TIMEOUT);
    } finally {
      setSaving(false);
    }
  };

  return { handleAddToFlow, loading };
};

export { useHandleAddToFlow, useHandleNoEditorAddConnection, TOAST_TIMEOUT, TOAST_TITLE };
