import { useCallback, useMemo } from 'react';
import useSearch from './useSearch';

const useSearchFilter = () => {
  const [searchParams, setSearchParams] = useSearch();
  const currentSearchFilter = useMemo(() => searchParams.searchFilter || {}, [searchParams]);

  const setSearchFilter = useCallback(
    (searchFilter, isSavePreviousParams = true) => {
      setSearchParams((prevSearchParams) =>
        isSavePreviousParams ? { ...prevSearchParams, searchFilter } : { searchFilter }
      );
    },
    [setSearchParams]
  );

  return [currentSearchFilter, setSearchFilter];
};

export default useSearchFilter;
