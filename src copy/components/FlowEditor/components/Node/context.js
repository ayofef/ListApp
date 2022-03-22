import { createContext, useContext } from 'react';

const NodesModalContext = createContext({});
const NodesModalContextProvider = NodesModalContext.Provider;

const useNodesModalContext = () => useContext(NodesModalContext);

export { NodesModalContextProvider, useNodesModalContext };
