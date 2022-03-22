import { useCallback, useEffect } from 'react';
import { pickBy, identity, isEqual } from 'lodash';

import useSearch from '../../../hooks/useSearch';
import { transformFilterToSearchParams } from '../../../utils/filterToSearchParams/transformFilterToSearchParams';
import { transformSortToSearchParams } from '../../../utils/transformSortToSearchParams';
import { transformStateToTable } from '../constants';
/**
 * Resets:
 * Columns size
 * hiddenColumns
 * columnOrder
 * searchParams
 */

const useResetTable = ({
  initialState,
  resetResizing,
  setLocalHiddenColumn,
  setColumnOrder,
  stateReducer,
  transformHiddenColumnsFn,
}) => {
  const [searchParams, setSearchParams] = useSearch();

  useEffect(() => {
    setColumnOrder(initialState?.columnOrder);
  }, [initialState, setColumnOrder]);

  const handleReset = useCallback(() => {
    const filter = initialState?.filter ? transformFilterToSearchParams(initialState?.filter) : {};
    const sort = transformSortToSearchParams(initialState?.sort) ?? {};
    const parsedFilter = () =>
      Object.entries(filter).reduce((acc, [key, value]) => {
        let fieldValue = value || undefined;
        if (typeof fieldValue === 'object') {
          fieldValue = pickBy(fieldValue, identity);
        }
        return fieldValue ? { ...acc, [key]: fieldValue } : acc;
      }, {}) ?? {};
    setColumnOrder(initialState?.tableState?.columnOrder);
    resetResizing();
    setLocalHiddenColumn(transformHiddenColumnsFn(initialState));
    if (!isEqual({ filter, sort }, searchParams)) {
      setSearchParams({ filter: parsedFilter(), sort });
    }
    setTimeout(() => {
      /** slow down */
      stateReducer(transformStateToTable(initialState), { type: 'hardReset' });
    }, 100);
  }, [
    initialState,
    setColumnOrder,
    resetResizing,
    setSearchParams,
    setLocalHiddenColumn,
    searchParams,
    stateReducer,
    transformHiddenColumnsFn,
  ]);

  return { handleReset };
};

export default useResetTable;
