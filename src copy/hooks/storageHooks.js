import { useState, useCallback, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { STORAGE_KEYS } from '../constants/storage';
import { localStorageService } from '../utils/localStorageService';
import { setStorageValue } from '../client/links/demoLink/storage';
import { deleteAllCookies } from '../utils/clearCookes';

export const useLoginStatus = () => {
  const [isLogin, setIsLogin] = useState(!!localStorageService.getItem(STORAGE_KEYS.token));

  const client = useApolloClient();

  const setToken = useCallback(
    (value) => {
      localStorageService.setItem(STORAGE_KEYS.token, value);
      setIsLogin(true);
    },
    [setIsLogin]
  );

  const setRefreshToken = useCallback((value) => {
    localStorageService.setItem(STORAGE_KEYS.refreshToken, value);
  }, []);

  const setEmail = useCallback((value) => {
    localStorageService.setItem(STORAGE_KEYS.email, value);
  }, []);

  const logOut = useCallback(() => {
    const cookieConsent = localStorage.getItem('TERMLY_API_CACHE');
    localStorageService.clearStorage();
    localStorage.setItem('TERMLY_API_CACHE', cookieConsent);
    setStorageValue(false);
    setIsLogin(false);
    deleteAllCookies();
    // eslint-disable-next-line no-console
    client.resetStore().catch(console.error);
  }, [setIsLogin, client]);

  return { setToken, isLogin, setRefreshToken, setEmail, logOut };
};

export const useNewRequestData = () => {
  const [requestData, setRequestData] = useState({});

  const updateNewRequestData = useCallback(
    (value) => {
      if (value) {
        localStorageService.setItem(value.id, value);
        setRequestData(value);
      } else {
        localStorageService.removeItem(requestData.id);
        setRequestData({});
      }
    },
    [setRequestData, requestData.id]
  );

  return { updateNewRequestData, requestData };
};

export const useConfigurationStorage = (key, defaultState) => {
  const storageState = localStorageService.getItem(STORAGE_KEYS.configurationState);
  const [value, setValue] = useState(storageState?.[key] ?? defaultState);

  const saveState = () => {
    localStorageService.setItem(STORAGE_KEYS.configurationState, { ...storageState, [key]: value });
  };

  useEffect(saveState, [value, storageState, key]);

  return [value, setValue];
};
