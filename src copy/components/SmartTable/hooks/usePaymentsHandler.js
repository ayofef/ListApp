import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useTableContext from '../TableContext';

const usePaymentsHandler = ({ rows, setLocalHiddenColumn }) => {
  const history = useHistory();
  const { selected, setSelected } = useTableContext();

  const isSelected = useCallback((name) => selected.indexOf(name) !== -1, [selected]);
  const numSelected = selected.length;
  const rowCount = rows?.length;

  const handleSelectAllClick = useCallback(
    (event) => {
      if (event.target.checked) {
        setSelected(rows.map((n) => n?.original?.id));
        return;
      }

      setSelected([]);
    },
    [rows, setSelected]
  );

  const handleHideColumn = useCallback(
    (id) => {
      setLocalHiddenColumn((prevHiddenColumns) => {
        return [...prevHiddenColumns, id];
      });
    },
    [setLocalHiddenColumn]
  );

  const handleSelect = useCallback(
    (event) => {
      event.stopPropagation();
      const id = event.currentTarget.dataset.rowid;

      setSelected((prevSelected) => {
        const selectedIndex = prevSelected.indexOf(id);
        /** @type Array<string> */
        let newSelected = [];

        if (selectedIndex === -1) {
          newSelected = newSelected.concat(prevSelected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(prevSelected.slice(1));
        } else if (selectedIndex === prevSelected.length - 1) {
          newSelected = newSelected.concat(prevSelected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(prevSelected.slice(0, selectedIndex), prevSelected.slice(selectedIndex + 1));
        }

        return newSelected;
      });
    },
    [setSelected]
  );

  //on Row click
  const handleOnClick = useCallback(
    (event) => {
      event.stopPropagation();
      const id = event.currentTarget.dataset.rowid;
      const {
        location: { pathname, state: locationState, search },
      } = history;
      history.push({ pathname: `${pathname}/details/${id}`, state: locationState, search });
    },
    [history]
  );

  return {
    handleOnClick,
    handleSelect,
    handleSelectAllClick,
    isSelected,
    numSelected,
    rowCount,
    handleHideColumn,
  };
};

export default usePaymentsHandler;
