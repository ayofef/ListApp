import { useMutation } from '@apollo/client';
import { DEFAULT_LOGOUT } from '../utils/queries/public/publicMutations';
import { STORAGE_KEYS } from '../constants/storage';
import { localStorageService } from '../utils/localStorageService';

const useLogout = (logOut) => {
  const [logOutRequest] = useMutation(DEFAULT_LOGOUT, {
    onCompleted: logOut,
    variables: {
      refreshToken: localStorageService.getItem(STORAGE_KEYS.refreshToken),
    },
  });

  const handleLogout = async () => {
    await logOutRequest();
  };

  return {
    handleLogout,
  };
};

export default useLogout;
