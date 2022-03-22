import { createContext, useContext } from 'react';

const StepsContext = createContext({ steps: [], setSteps: () => {} });
const StepsContextProvider = StepsContext.Provider;
const useStepsContext = () => useContext(StepsContext);

export { StepsContextProvider, useStepsContext };
