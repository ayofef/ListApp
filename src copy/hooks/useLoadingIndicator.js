import { useEffect } from 'react';
import { useGlobalContext } from '../containers/App/context';

/**
 * @param {string} key
 * @param {boolean} status
 * */
export const useLoadingIndicator = (key, status) => {
  const { setGlobalLoading } = useGlobalContext();

  useEffect(() => {
    setGlobalLoading(key, status);

    return () => {
      if (!status) {
        return;
      }

      setGlobalLoading(key, false);
    };
  }, [key, status, setGlobalLoading]);
};
