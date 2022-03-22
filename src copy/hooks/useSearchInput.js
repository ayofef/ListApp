import { useEffect, useState } from 'react';
import omit from 'lodash/omit';
import useSearch from './useSearch';

/**
 * @param {string} [key=search]
 *
 * @return {[string, function]}
 * */
const useSearchInput = (key = 'search') => {
  const [searchParams, setSearchParams] = useSearch();
  const search = searchParams?.[key] ?? '';
  const [value, setValue] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchParams((prevSearchParams) => {
        const currentValue = prevSearchParams?.[key] ?? '';

        if (currentValue === value) {
          return prevSearchParams;
        }

        if (value === '') {
          return omit(prevSearchParams, [key]);
        }

        return { ...prevSearchParams, [key]: value };
      });
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [key, value, setSearchParams]);

  useEffect(() => setValue(search), [search]);

  return [value, setValue];
};

export { useSearchInput };
