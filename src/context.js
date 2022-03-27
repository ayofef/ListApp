import { createContext, useContext } from 'react';

const GlobalContext = createContext(null);
const GlobalContextProvider = GlobalContext.Provider;
const useGlobalContext = () => useContext(GlobalContext);

export { GlobalContextProvider, useGlobalContext };
