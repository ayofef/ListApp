import { useHandleConnectionConnect } from '../../../../../../hooks/connectionsHooks';
import { useHandleAddToFlow, useHandleNoEditorAddConnection } from '../../../hooks/useHandleAddToFlow';
import { useFlowEditorContext } from '../../../../../../components/FlowEditor/context';

const avoidRedirect = true;

export const useHandleConnection = ({ connection, closeModal }) => {
  const { topFlowId } = useFlowEditorContext();

  const useHook = topFlowId ? useHandleNoEditorAddConnection : useHandleAddToFlow;
  const { handleAddToFlow } = useHook(topFlowId ? { flowId: topFlowId, closeModal } : undefined);
  const isPaymentGateway = Boolean(connection?.type?.includes('PAYMENT_GATEWAY'));
  const closeAndRefetch = closeModal && ((e) => closeModal(e, true));
  const callback = isPaymentGateway ? handleAddToFlow : closeAndRefetch;
  const isNoCodeContext = Boolean(topFlowId);

  const { handleConnect, renderConnectionForm } = useHandleConnectionConnect({
    connection,
    callback,
    avoidRedirect,
    closeModal,
    isNoCodeContext,
  });

  return { handleConnect, renderConnectionForm };
};
