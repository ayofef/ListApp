import { useCallback, useState } from 'react';

export const useBoolState = (initialState) => {
  const [bool, setBool] = useState(initialState);

  const on = useCallback(() => setBool(true), []);
  const off = useCallback(() => setBool(false), []);
  const toggle = useCallback(() => setBool((prev) => !prev), []);

  return {
    on,
    off,
    toggle,
    bool,
    setBool,
  };
};
