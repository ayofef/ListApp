import { createContext, useContext } from 'react';

const PaymentsDetailsContext = createContext(null);
const PaymentsDetailsContextProvider = PaymentsDetailsContext.Provider;
const usePaymentsDetailsContext = () => useContext(PaymentsDetailsContext);

export { PaymentsDetailsContextProvider, usePaymentsDetailsContext };
