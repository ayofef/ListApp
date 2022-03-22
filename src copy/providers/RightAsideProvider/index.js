import { createContext, useContext } from 'react';

const RightAsideContext = createContext({
  globalFilterState: false,
  toggleGlobalFilterState: () => {},
});
const RightAsideProvider = RightAsideContext.Provider;
const useRightAsideContext = () => useContext(RightAsideContext);

export { RightAsideProvider, useRightAsideContext };
