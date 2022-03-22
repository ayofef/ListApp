import React, { useEffect, useReducer, useRef } from 'react';
import { useQuery } from '@apollo/client';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { reducer } from './state/reducer';
import { initializerArg } from './state/initializerArg';
import { initializer } from './state/initializer';
import { patch } from './state/actions';
import { UserContext } from './UserContext';
import { GET_ME_AND_WE } from '../../utils/queries/public/publicQueries';
import { useSetCustomerMetadata } from './useSetCustomerMetadata';
import { pickFields, FIRST_TIME_ENTRY } from './utils';
import { useGlobalContext } from '../../containers/App/context';
import UserPilotProvider from './UserPilotProvider';

const UserProvider = ({ children }) => {
  const { loading, error, data } = useQuery(GET_ME_AND_WE);
  const { isLogin } = useGlobalContext();
  const [state, dispatch] = useReducer(reducer, initializerArg, initializer);
  const stateRef = useRef();
  const metadataRef = useRef();

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    metadataRef.current = data?.we?.metadata;
  }, [data?.we?.metadata]);

  useEffect(() => {
    const firstTimeEntry = data?.we?.metadata?.[FIRST_TIME_ENTRY];
    const payload = pickFields(firstTimeEntry);

    if (loading || error || isEmpty(payload) || isEqual(payload, pickFields(stateRef.current))) {
      return;
    }

    dispatch(patch(payload));
  }, [data?.we?.metadata, dispatch, error, loading]);

  useSetCustomerMetadata({ metadataRef, state });

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {isLogin ? <UserPilotProvider>{children}</UserPilotProvider> : children}
    </UserContext.Provider>
  );
};

export { UserProvider };
