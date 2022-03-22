import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { GET_FLOW_LIST } from '../utils/queries/flows/flowsQueries';
import { GQL_M_CREATE_PAYMENT_FLOW } from '../utils/queries/flows/mutations';
import { useGlobalContext } from '../containers/App/context';
import { isDefined } from '../utils/helpers';

const TITLE = 'Flows';

const mutateOptions = {
  refetchQueries: [{ query: GET_FLOW_LIST }],
  awaitRefetchQueries: true,
};

const useCreateFlow = () => {
  const { push } = useHistory();
  const [createPaymentFlowPromise, { error }] = useMutation(GQL_M_CREATE_PAYMENT_FLOW, mutateOptions);
  const { setGlobalLoading } = useGlobalContext();

  const handleCreateFlow = useCallback(() => {
    setGlobalLoading(TITLE, true);
    createPaymentFlowPromise({ variables: { customerInputs: {} } })
      .then((res) => {
        const paymentFlowID = res?.data?.createPaymentFlow?.id;

        if (isDefined(paymentFlowID)) {
          push({
            pathname: `/flows/${paymentFlowID}/details`,
          });
        }
      })
      .finally(() => setGlobalLoading(TITLE, false));
  }, [createPaymentFlowPromise, push, setGlobalLoading]);

  return {
    handleCreateFlow,
    error,
  };
};

export default useCreateFlow;
