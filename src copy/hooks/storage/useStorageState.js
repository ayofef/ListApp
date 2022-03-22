import { useState, useEffect, useCallback } from 'react';

const DEFAULT_OPTIONS = {
  parser: JSON.parse,
  serializer: JSON.stringify,
  comparator: Object.is,
};

const parseItem = (item, parser) => {
  if (item === null) {
    return null;
  }

  if (!parser) {
    return item;
  }

  try {
    const parsedItem = parser(item);
    return parsedItem;
  } catch {
    // ignore
    return null;
  }
};

const getStorageItem = (key, storage, parser) => {
  if (!storage) {
    return null;
  }

  let item;
  try {
    item = storage.getItem(key);
  } catch {
    // ignore
    return null;
  }

  const parsedItem = parseItem(item, parser);

  return parsedItem;
};

const setStorageItem = (key, item, storage, serializer) => {
  if (!storage) {
    return;
  }

  try {
    const serializedItem = serializer ? serializer(item) : item;

    storage.setItem(key, serializedItem);
  } catch {
    // ignore
  }
};

const initializeValue = (key, initialValue, storage, parser) => {
  const storageValue = getStorageItem(key, storage, parser);

  const value = storageValue !== null ? storageValue : initialValue;

  return value;
};

export const useStorageState = (key, initialValue, storage, options = DEFAULT_OPTIONS) => {
  const comparator = options?.comparator ?? DEFAULT_OPTIONS.comparator;

  const [value, setValue] = useState(() => initializeValue(key, initialValue, storage, options?.parser));

  const storageListener = useCallback(
    (event) => {
      if (event.storageArea !== storage || event.key !== key) {
        return;
      }

      const newValue = parseItem(event.newValue, options?.parser);
      const hasChanged = comparator(value, newValue);

      if (hasChanged) {
        setValue(newValue);
      }
    },
    [value, key, storage, options?.parser, comparator]
  );

  useEffect(() => {
    window?.addEventListener('storage', storageListener);

    return () => {
      window?.removeEventListener('storage', storageListener);
    };
  }, [storageListener]);

  const setItem = useCallback(
    (newValue) => {
      setStorageItem(key, newValue, storage, options?.serializer);
      setValue(newValue);
    },
    [key, storage, options?.serializer]
  );

  const removeItem = useCallback(() => {
    storage.removeItem(key);
  }, [storage, key]);

  return [value, setItem, removeItem];
};
