import { useCallback, useMemo } from 'react';
import useSearch from './useSearch';

const useFilter = () => {
  const [searchParams, setSearchParams] = useSearch();
  const currentFilter = useMemo(() => searchParams.filter || {}, [searchParams]);

  const setFilter = useCallback(
    (filter, shouldReplace) => {
      setSearchParams((prevSearchParams) => ({ ...prevSearchParams, filter }), shouldReplace);
    },
    [setSearchParams]
  );

  return [currentFilter, setFilter];
};

export default useFilter;
