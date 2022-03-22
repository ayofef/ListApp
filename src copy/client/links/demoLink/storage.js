import { DEMO_KEY } from './constants';

const STORAGE = window.sessionStorage;
/**
 * @return {boolean}
 * */
const getStorageValue = () => Boolean(STORAGE.getItem(DEMO_KEY));
/**
 * @param {boolean} value
 * */
const setStorageValue = (value) => {
  if (value) {
    STORAGE.setItem(DEMO_KEY, 'true');
    return;
  }

  STORAGE.removeItem(DEMO_KEY);
};

export { getStorageValue, setStorageValue };
