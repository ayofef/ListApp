import { createContext, useContext } from 'react';

const MVPAutomationContext = createContext({});

const useMVPAutomationContext = () => useContext(MVPAutomationContext);

export { MVPAutomationContext, useMVPAutomationContext };
