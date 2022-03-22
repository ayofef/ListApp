import { useEffect, useState } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

import { transformStateToTable } from '../constants';
/**
 *
 * stateReducer Conditions
 * - default:  return null - prevents unnecessary update
 * 1. when we hide a column, we want to shouldSaveTable to be true - shouldSaveTable is a state manage outside of the table so the newState receive by the state reducer will be equal to the previous sate but once the column are hidden two actions are dispatched - resetHiddenColumns and resetResize - we want to set shouldSaveTable to false when prevSate and newSate are equal but only when those to actions are not dispatched
 * 2. if newState and prevState is not equal, update with newState
 * 3. if action type is different from "init" | !includes("reset"),
 * table state has changed and should show save button
 * 4. hardReset: last stage of useResetTableHook:
 * returns the previous state of the table
 * 5. "resetResize": table autoResets and when called, clears table column widths,
 * returns newState + initialStates columnWidths
 * 6. "resetHiddenColumns"; hack; prevents save changes status to persist across
 * views
 */

const useTableSettings = ({ setShouldSaveTable, shouldSaveTable, initialState }) => {
  const [shouldSave, setShouldSave] = useState(false);

  const defaultColumn = {
    minWidth: 150,
    width: 150,
    maxWidth: 400,
  };

  useEffect(() => {
    if (shouldSave && !shouldSaveTable) {
      setShouldSaveTable(true);
    }
  }, [shouldSave, setShouldSaveTable, shouldSaveTable]);

  const stateReducer = (newState, action, prevState) => {
    const initState = transformStateToTable(initialState);
    const isResizing = action?.type === 'resetHiddenColumns' || action?.type === 'resetResize';

    if (isEqual(newState, prevState) && !isResizing) {
      setShouldSave(false);
      setShouldSaveTable(false);
      return prevState;
    }

    const falsyColumnOrder =
      (action?.type === 'setColumnOrder' && action?.columnOrder === undefined) ||
      initialState?.tableState?.columnOrder === action?.columnOrder;

    if (
      action?.type !== 'init' &&
      !action?.type?.includes('reset') &&
      !shouldSave &&
      !falsyColumnOrder &&
      action?.type !== 'hardReset'
    ) {
      setShouldSave(true);
    }

    if (action?.type === 'setColumnOrder' && !action?.columnOrder) {
      return { ...newState, columnOrder: initState?.columnOrder };
    }
    if (action?.type === 'hardReset') {
      setShouldSave(false);
      setShouldSaveTable(false);
      return prevState;
    }
    if (action?.type === 'resetResize' && !isEqual(newState?.columnResizing, initState?.columnResizing)) {
      return { ...newState, columnResizing: initState?.columnResizing };
    }

    if (action?.type === 'switchingPages' && isEmpty(newState)) {
      setShouldSave(false);
      setShouldSaveTable(false);
    }
    if (!isEqual(newState, prevState)) {
      return newState;
    }
    return null;
  };

  return { defaultColumn, stateReducer };
};

export default useTableSettings;
