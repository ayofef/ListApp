import { createContext, useContext } from 'react';

const newConnectionContext = createContext(null);
const NewConnectionProvider = newConnectionContext.Provider;
const useNewConnectionContext = () => useContext(newConnectionContext);

export { NewConnectionProvider, useNewConnectionContext };
