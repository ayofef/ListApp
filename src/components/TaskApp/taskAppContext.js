import { createContext, useContext } from 'react';

const TaskAppContext = createContext(null);
const TaskAppContextProvider = TaskAppContext.Provider;
const useTaskAppContext = () => useContext(TaskAppContext);

export { TaskAppContextProvider, useTaskAppContext };
