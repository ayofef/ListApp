import { STORAGE_KEYS } from '../constants/storage';

class LocalStorageService {
  #prefix = 'wt';

  setItem(key, value) {
    localStorage.setItem(`${this.#prefix}${key}`, JSON.stringify(value));
  }

  removeItem(key) {
    localStorage.removeItem(`${this.#prefix}${key}`);
  }

  getItem(key) {
    let value = localStorage.getItem(`${this.#prefix}${key}`);

    if (value) {
      try {
        value = JSON.parse(value);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        value = null;
      }
    }
    return value;
  }

  clearStorage() {
    const recoveryPass = localStorage.getItem(`${this.#prefix}${STORAGE_KEYS.recoveryPass}`);
    localStorage.clear();
    if (recoveryPass) {
      localStorage.setItem(`${this.#prefix}${STORAGE_KEYS.recoveryPass}`, recoveryPass);
    }
  }
}

export const localStorageService = new LocalStorageService();
