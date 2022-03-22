import { createContext, useContext } from 'react';

const PaymentFlowContext = createContext({});

const usePaymentFlowContext = () => useContext(PaymentFlowContext);

export { PaymentFlowContext, usePaymentFlowContext };
