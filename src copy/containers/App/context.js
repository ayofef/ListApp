import { createContext, useContext } from 'react';

const GlobalContext = createContext(null);
const GlobalContextProvider = GlobalContext.Provider;
const useGlobalContext = () => useContext(GlobalContext);

const FeatureContext = createContext(null);
const FeatureContextProvider = FeatureContext.Provider;
const useFeatureContext = () => useContext(FeatureContext);

export { GlobalContextProvider, useGlobalContext, FeatureContextProvider, FeatureContext, useFeatureContext };
