import { createContext, useContext } from 'react';

const ActionInputContext = createContext({});
const useActionInputContext = () => useContext(ActionInputContext);

export { ActionInputContext, useActionInputContext };
