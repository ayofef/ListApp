import { useStorageState } from './useStorageState';

export const useLocalStorageState = (key, initialValue, options) =>
  useStorageState(key, initialValue, localStorage, options);
