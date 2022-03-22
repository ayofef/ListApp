import React, { createContext, useContext } from 'react';
// eslint-disable-next-line import/no-cycle
import { useGetChartData } from './dashboardInsightsHooks';

const InsightsContext = createContext(null);

const InsightsProvider = ({ children }) => {
  const {
    dateFilter,
    chartsData,
    setChartsData,
    getChartsData,
    refetch,
    loading,
    initialInterval,
    showDate,
  } = useGetChartData();

  return (
    <InsightsContext.Provider
      value={{
        chartsData,
        setChartsData,
        refetch,
        initialInterval,
        loading,
        getChartsData,
        dateFilter,
        showDate,
      }}
    >
      {children}
    </InsightsContext.Provider>
  );
};

const useInsightsContext = () => useContext(InsightsContext);

export { InsightsProvider, useInsightsContext };
