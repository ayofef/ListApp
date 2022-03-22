import React, { useMemo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTable, useColumnOrder, useAbsoluteLayout, useResizeColumns } from 'react-table';
import { useMeasure, usePrevious } from 'react-use';
import { useLocation } from 'react-router-dom';
import { StyledTable } from '../table/styled';
import { StyledTableContainer } from './styled';
import SaveView from './SaveView';
import ListSkeleton from '../ListSkeleton';
import EmptyState from './EmptyState';
import Pagination from './Pagination';
import OptionsDrawer from './OptionsDrawer';
import { ROWS_PER_PAGE, transformTableToFields, transformTableToState, transformStateToTable } from './constants';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { TableContext } from './TableContext';
import { useTableSettings, useResetTable } from './hooks';
import useSearchChanges from '../../hooks/useSearchChanges';
import { useGlobalContext } from '../../containers/App/context';
import ExportFiles from './ExportFiles';
import useInfiniteHorizontalScroll from './hooks/useInfiniteHorizontalScroll';

const SmartTable = ({
  data,
  isEmpty,
  pageInfo,
  loading,
  initialState,
  setActiveDrawer,
  activeDrawer,
  drawerOpen,
  shouldSaveTable,
  setShouldSaveTable,
  exportDialog,
  toggleExportDialog,
  selected,
  setSelected,
  checkboxEditMode,
  toggleCheckboxEditMode,
  globalTableSaveDialog,
  toggleSaveDialog,
  headCells,
  searchSelectRef,
  transformHiddenColumnsFn,
  emptyStateComponent,
}) => {
  /** Custom Empty State */
  const EmptyStateComponent = (typeof emptyStateComponent === 'function' && emptyStateComponent) || EmptyState;

  /*Get our view values and transforms search and filter to data shape supported by backend */
  const { initialValues } = useSearchChanges();

  /*If the left sidebar is collapsed  */
  const { sidebarCollapsed } = useGlobalContext();

  /*Manages hidden columns  */
  const [localHiddenColumn, setLocalHiddenColumn] = useState([]);

  /*helps set the width of the table and each columns  */
  const [containerRef, { width: tableWidth }] = useMeasure();

  const { pathname } = useLocation();

  /*Here, we filter out hidden columns from our list of columns  */
  const defaultVisibleColumns = useMemo(
    () => headCells?.filter((header) => !localHiddenColumn?.includes(header.accessor))?.filter(Boolean) ?? [],

    [headCells, localHiddenColumn]
  );

  const { loaderRefFn, chunkedColumns } = useInfiniteHorizontalScroll({
    headCells,
    checkboxEditMode,
    defaultVisibleColumns,
  });

  const columns = checkboxEditMode ? chunkedColumns : defaultVisibleColumns;

  /*A flag to disable hide columns feature - The table crashed when there are no columns (headCells) */
  const disableHideColumns = useMemo(() => defaultVisibleColumns.length === 1, [defaultVisibleColumns]);

  /*A flag to display pagination buttons */
  const showPagination = pageInfo?.totalPages > 1;

  /*here set localHiddenColumn value [""]  */
  useEffect(() => {
    setLocalHiddenColumn(transformHiddenColumnsFn(initialState));
  }, [initialState, transformHiddenColumnsFn]);

  /*useTableSettings here returns stateReducer and default column both passed into useTable. See react-table doc. */
  const { defaultColumn, stateReducer } = useTableSettings({
    setShouldSaveTable,
    shouldSaveTable,
    initialState,
  });

  /*https://react-table.tanstack.com*/
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setColumnOrder,
    allColumns,
    state: tableState,
    resetResizing,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: transformStateToTable(initialState),
      stateReducer,
    },
    useColumnOrder,
    useAbsoluteLayout,
    useResizeColumns
  );
  /*This helps reset the table and hide save view button on route change */
  const notifyStateOnRouteChange = useCallback(() => stateReducer({}, { type: 'switchingPages' }), [stateReducer]);

  const prevCount = usePrevious(pathname);

  useEffect(() => {
    if (prevCount !== pathname) {
      notifyStateOnRouteChange(); //hides save view when switching between views
    }
  }, [pathname, notifyStateOnRouteChange, prevCount]);

  /*This handles our reset view feature */
  const { handleReset } = useResetTable({
    initialState,
    resetResizing,
    setLocalHiddenColumn,
    setColumnOrder,
    tableState,
    stateReducer,
    transformHiddenColumnsFn,
  });

  const contextValue = useMemo(
    () => ({
      headerGroups,
      setColumnOrder,
      allColumns,
      rows,
      tableState,
      drawerOpen,
      checkboxEditMode,
      toggleCheckboxEditMode,
      localHiddenColumn,
      setLocalHiddenColumn,
      getTableBodyProps,
      prepareRow,
      headCells,
      handleReset,
      toggleSaveDialog,
      data,
      setSelected,
      tableWidth,
      activeDrawer,
      setActiveDrawer,
      shouldSaveTable,
      setShouldSaveTable,
      exportDialog,
      toggleExportDialog,
      selected,
      globalTableSaveDialog,
      disableHideColumns,
    }),
    [
      headerGroups,
      setColumnOrder,
      allColumns,
      rows,
      tableState,
      headCells,
      checkboxEditMode,
      toggleCheckboxEditMode,
      drawerOpen,
      localHiddenColumn,
      setLocalHiddenColumn,
      getTableBodyProps,
      prepareRow,
      handleReset,
      toggleSaveDialog,
      data,
      selected,
      setSelected,
      toggleExportDialog,
      tableWidth,
      activeDrawer,
      setActiveDrawer,
      shouldSaveTable,
      setShouldSaveTable,
      exportDialog,
      globalTableSaveDialog,
      disableHideColumns,
    ]
  );

  const visibleColumns = useMemo(() => headCells?.filter((header) => !localHiddenColumn?.includes(header.accessor)), [
    headCells,
    localHiddenColumn,
  ]);

  /*Values to send to back when user clicks on save view */
  const valuesToSave = useMemo(
    () => ({
      ...initialValues,
      hiddenFields: transformTableToFields(localHiddenColumn),
      visibleFields: transformTableToFields(visibleColumns),
      tableState: transformTableToState(tableState),
    }),
    [initialValues, localHiddenColumn, tableState, visibleColumns]
  );

  return (
    <TableContext.Provider value={contextValue}>
      <StyledTableContainer
        ref={containerRef}
        // if there's no pagination, height = 100vh -106px
        //else adjust height to show scrollbar
        empty={!showPagination}
        draweropen={drawerOpen ? 1 : 0}
        sidecollapsed={sidebarCollapsed ? 1 : 0}
        {...getTableProps()}
      >
        {/**Table */}
        <StyledTable width="1px" aria-labelledby="tableTitle" size="small" aria-label="enhanced table">
          <TableHead />

          <TableBody loaderRefFn={loaderRefFn} />
        </StyledTable>

        <OptionsDrawer />

        {/**STATES */}
        {loading && <ListSkeleton rowNumber={ROWS_PER_PAGE} height={38} p={0.2} />}
        {isEmpty && <EmptyStateComponent searchSelectRef={searchSelectRef} />}

        {/**MODALS */}
        <SaveView
          initialValues={valuesToSave}
          isOpen={globalTableSaveDialog}
          toggleIsOpen={toggleSaveDialog}
          notifyStateOnRouteChange={notifyStateOnRouteChange}
        />
        <ExportFiles
          selected={selected}
          isOpen={exportDialog}
          toggleExportDialog={toggleExportDialog}
          currentViewColumns={allColumns}
        />
      </StyledTableContainer>
      {/**Pagination */}
      {showPagination && <Pagination loading={loading} pageInfo={pageInfo} />}
    </TableContext.Provider>
  );
};

SmartTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  pageInfo: PropTypes.shape({
    endCursor: PropTypes.number,
    totalPages: PropTypes.number,
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  isEmpty: PropTypes.bool.isRequired,
  initialState: PropTypes.shape({
    tableState: PropTypes.shape({
      columnResizing: PropTypes.shape({
        columnWidths: PropTypes.arrayOf(PropTypes.shape({})),
      }),
      columnOrder: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
  //props
  setActiveDrawer: PropTypes.func.isRequired,
  activeDrawer: PropTypes.shape({
    menu: PropTypes.string,
    subMenu: PropTypes.string,
  }).isRequired,
  shouldSaveTable: PropTypes.bool.isRequired,
  setShouldSaveTable: PropTypes.func.isRequired,
  exportDialog: PropTypes.bool.isRequired,
  toggleExportDialog: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelected: PropTypes.func.isRequired,
  checkboxEditMode: PropTypes.bool.isRequired,
  toggleCheckboxEditMode: PropTypes.func.isRequired,
  globalTableSaveDialog: PropTypes.bool.isRequired,
  toggleSaveDialog: PropTypes.func.isRequired,
  headCells: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  searchSelectRef: PropTypes.shape({}).isRequired,
  transformHiddenColumnsFn: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  emptyStateComponent: PropTypes.elementType.isRequired,
};

export default SmartTable;
