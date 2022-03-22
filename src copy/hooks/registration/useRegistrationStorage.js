import { REG_SESSION_STORAGE_KEY } from '../../constants/registration';
import { useSessionStorageState } from '../storage';

export const useRegistrationStorage = () => {
  const [value, setValue, clearStorage] = useSessionStorageState(REG_SESSION_STORAGE_KEY, {});

  return [value, setValue, clearStorage];
};
