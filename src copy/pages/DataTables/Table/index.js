import PropTypes from 'prop-types';
import React from 'react';
import { useTableStarterContext } from '../hooks/useTableStarter';

import SmartTable from '../../../components/SmartTable';

const Table = ({
  data,
  loading,
  isEmpty,
  pageInfo,
  headCells,
  initialTableState,
  transformHiddenColumnsFn,
  emptyStateComponent,
}) => {
  const {
    shouldSaveTable,
    setShouldSaveTable,
    saveViewDialog,
    toggleSaveViewDialog,
    selected,
    setSelected,
    exportDialog,
    toggleExportDialog,
    searchSelectRef,
    checkboxEditMode,
    toggleCheckboxEditMode,
    setActiveDrawer,
    activeDrawer,
    drawerOpen,
  } = useTableStarterContext();

  return (
    <SmartTable
      data={data}
      isEmpty={isEmpty}
      loading={loading}
      setActiveDrawer={setActiveDrawer}
      activeDrawer={activeDrawer}
      drawerOpen={drawerOpen}
      shouldSaveTable={shouldSaveTable}
      setShouldSaveTable={setShouldSaveTable}
      exportDialog={exportDialog}
      toggleExportDialog={toggleExportDialog}
      selected={selected}
      setSelected={setSelected}
      checkboxEditMode={checkboxEditMode}
      toggleCheckboxEditMode={toggleCheckboxEditMode}
      pageInfo={pageInfo}
      globalTableSaveDialog={saveViewDialog}
      toggleSaveDialog={toggleSaveViewDialog}
      headCells={headCells}
      searchSelectRef={searchSelectRef}
      initialState={initialTableState}
      transformHiddenColumnsFn={transformHiddenColumnsFn}
      emptyStateComponent={emptyStateComponent}
    />
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  headCells: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  isEmpty: PropTypes.bool.isRequired,
  pageInfo: PropTypes.shape({
    endCursor: PropTypes.number,
    totalPages: PropTypes.number,
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool,
  }).isRequired,
  initialTableState: PropTypes.shape({
    tableState: PropTypes.shape({
      columnResizing: PropTypes.shape({
        columnWidths: PropTypes.arrayOf(PropTypes.shape({})),
      }),
      columnOrder: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
  transformHiddenColumnsFn: PropTypes.func.isRequired,
  emptyStateComponent: PropTypes.elementType.isRequired,
};

export default Table;
