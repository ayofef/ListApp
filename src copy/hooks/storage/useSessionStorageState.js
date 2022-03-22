import { useStorageState } from './useStorageState';

export const useSessionStorageState = (key, initialValue, options) =>
  useStorageState(key, initialValue, sessionStorage, options);
