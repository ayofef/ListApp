import { useEffect, useRef } from 'react';
import { useElementDataToSave } from '../fields/hooks/useElementDataToSave';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const randomString = (length) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const usernameLength = 12;
const passwordLength = 16;

export const useAuthCredentials = () => {
  const calledRef = useRef(false);
  const [{ username, password }, updateDataToSave] = useElementDataToSave();

  useEffect(() => {
    if (calledRef.current) {
      return;
    }
    if (!username) {
      updateDataToSave({ username: randomString(usernameLength) });
    }
    if (!password) {
      updateDataToSave({ password: randomString(passwordLength) });
    }
    calledRef.current = true;
  }, [password, updateDataToSave, username]);

  return {
    username,
    password,
    updateDataToSave,
  };
};
