import { setStorageValue } from './links/demoLink/storage';
import { localStorageService } from '../utils/localStorageService';
import { deleteAllCookies } from '../utils/clearCookes';

export const logOut = () => {
  setStorageValue(false);
  localStorageService.clearStorage();
  deleteAllCookies();
};
