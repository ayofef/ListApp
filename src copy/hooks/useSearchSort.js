import { useCallback, useMemo } from 'react';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import useSearch from './useSearch';

const DIRECTION = [undefined, 'asc', 'desc'];
const DIRECTION_WITHOUT_DESC = [undefined, 'asc'];

const rotateDirection = (currentValue, noDesc) => {
  const direction = noDesc ? DIRECTION_WITHOUT_DESC : DIRECTION;
  const currentIndex = direction.indexOf(currentValue);

  return direction[(currentIndex + 1) % direction.length];
};

const useSearchSort = (noDesc) => {
  const [searchParams, setSearchParams] = useSearch();
  const sort = useMemo(() => searchParams.sort ?? {}, [searchParams]);

  const setSort = useCallback(
    (property) => {
      setSearchParams(({ sort: prevSort, ...prevSearchParams }) => {
        const prevDirection = prevSort?.[property];

        const parseProperty = () => {
          if (typeof property === 'object') {
            if (property?.value === 'undefined') {
              return {};
            }
            return {
              [property.label]: property.value,
            };
          }
          return { [property]: rotateDirection(prevDirection, noDesc) };
        };

        return {
          ...prevSearchParams,
          // uncomment prevSort for multi sort
          sort: pickBy(
            {
              /*...prevSort,*/
              ...parseProperty(),
            },
            identity
          ),
        };
      });
    },
    [noDesc, setSearchParams]
  );

  return [sort, setSort];
};

export default useSearchSort;
