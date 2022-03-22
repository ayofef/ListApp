import React, { useContext } from 'react';
import { initializerArg } from './state/initializerArg';

const UserContext = React.createContext({ state: initializerArg, dispatch: (_) => {} });

const useUserSelector = (selector) => {
  const { state } = useContext(UserContext);

  return selector(state);
};
const useUserDispatch = () => {
  const { dispatch } = useContext(UserContext);

  return dispatch;
};

export { UserContext, useUserSelector, useUserDispatch };
