import { createContext, useContext } from 'react';

const TableContext = createContext({});

const useTableContext = () => useContext(TableContext);

export default useTableContext;
export { TableContext };
