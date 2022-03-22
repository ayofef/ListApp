import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import StyledInPageSection from '../../../components/StyledInPageSection';
import AddNewButton from '../../../../Components/AddNewButton';
import PaymentMethodItem from './PaymentMethodItem';
import { getPaymentMethodsOption } from '../../../../../../utils/generatePaymentMethodOptions';
import { usePaymentFlowContext } from '../../../../paymentFlowContext';
import { useEnablePaymentMethodsForPaymentFlow } from '../../../hooks/useEnablePaymentMethodsForPaymentFlow';
import { parseConnectionId } from './constant';

const parseMethods = ({ enabledPaymentMethods, value, connectionId }) => {
  const parentConnection = enabledPaymentMethods?.find((el) => parseConnectionId(el?.connectionId) === connectionId);
  if (Array.isArray(parentConnection?.methods)) {
    return parentConnection?.methods?.includes(value)
      ? parentConnection?.methods?.filter((el) => el !== value)
      : [...parentConnection?.methods, value];
  }
  return [value];
};

const CustomCheckoutSubComponent = () => {
  const { push, location } = useHistory();
  const { handleEnablePaymentMethod } = useEnablePaymentMethodsForPaymentFlow();
  const { flowId, connectedProcessors, enabledPaymentMethods } = usePaymentFlowContext();

  const transformConnections = useMemo(
    () =>
      connectedProcessors.map((processor) => {
        return Array.isArray(processor?.enabledPaymentMethods)
          ? processor?.enabledPaymentMethods?.map((paymentMethod) => ({
              connectionId: processor?.id,
              paymentMethod,
              connectionName: processor?.name ?? processor?.company?.name,
              connectionLogo: processor?.company?.logo,
            }))
          : [];
      }),
    [connectedProcessors]
  );

  const options = useMemo(() => getPaymentMethodsOption(transformConnections?.flat()?.filter(Boolean) ?? []), [
    transformConnections,
  ]);

  const handleNewPaymentMethod = useCallback(() => {
    push({ pathname: `/flows/${flowId}/details/settings/payment-processors`, search: location?.search ?? '' });
  }, [push, flowId, location?.search]);

  const handleSwitch = async (option) => {
    const connectionId = option?.connectionId;
    const methods = parseMethods({
      enabledPaymentMethods,
      connectionId,
      value: option?.value,
    });
    // prevent mutation if methods includes null
    if (methods.includes(null)) {
      return null;
    }
    return handleEnablePaymentMethod(connectionId, methods);
  };

  return (
    <StyledInPageSection title="Payment Methods">
      {options?.map((opt) => (
        <PaymentMethodItem
          key={`${opt?.connectionId}-${opt?.connectionName}`}
          option={opt}
          handleSwitch={handleSwitch}
        />
      ))}
      <AddNewButton onClick={handleNewPaymentMethod} label="New payment method" />
    </StyledInPageSection>
  );
};

export default CustomCheckoutSubComponent;
