import { useState, useRef, createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

const useTableStarter = () => {
  const { pathname, search } = useLocation();
  const [activeDrawer, setActiveDrawer] = useState({});
  const [shouldSaveTable, setShouldSaveTable] = useState(false);
  const searchSelectRef = useRef(null);
  const [checkboxEditMode, setCheckboxEditMode] = useState(false);
  const toggleCheckboxEditMode = () => setCheckboxEditMode((prevState) => !prevState);
  const [exportDialog, setExportDialog] = useState(false);
  const [selected, setSelected] = useState([]);
  const toggleExportDialog = () => setExportDialog((prevState) => !prevState);
  const [saveViewDialog, setSaveViewDialog] = useState(false);
  const toggleSaveViewDialog = () => setSaveViewDialog((prevState) => !prevState);

  const drawerOpen = !isEmpty(activeDrawer);

  /**
   * Update selection on route and search change
   */
  useEffect(() => {
    setSelected([]);
  }, [pathname, search]);

  return {
    activeDrawer,
    setActiveDrawer,
    shouldSaveTable,
    setShouldSaveTable,
    searchSelectRef,
    checkboxEditMode,
    toggleCheckboxEditMode,
    exportDialog,
    selected,
    setSelected,
    toggleExportDialog,
    saveViewDialog,
    toggleSaveViewDialog,
    drawerOpen,
  };
};

const TableStarterContext = createContext(null);
const TableStarterContextProvider = TableStarterContext.Provider;
const useTableStarterContext = () => useContext(TableStarterContext);

export { TableStarterContextProvider, useTableStarterContext, useTableStarter };
