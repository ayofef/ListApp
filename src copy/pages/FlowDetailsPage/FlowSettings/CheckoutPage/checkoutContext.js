import { createContext, useContext } from 'react';

const CheckoutContext = createContext(null);
const CheckoutContextProvider = CheckoutContext.Provider;
const useCheckoutContext = () => useContext(CheckoutContext);

export { CheckoutContextProvider, useCheckoutContext };
