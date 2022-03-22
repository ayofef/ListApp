import React, { useContext, useState } from 'react';

const Context = React.createContext([false, (_) => {}]);

const UiActionProvider = ({ children }) => {
  const state = useState(false);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

const useUiAction = () => useContext(Context);

export { UiActionProvider, useUiAction };
