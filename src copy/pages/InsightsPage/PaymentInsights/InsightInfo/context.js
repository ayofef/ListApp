import React, { createContext, useContext, useMemo } from 'react';

import useInsightInfoHook from './insightInfoHook';

const InsightDetailsContext = createContext(null);

const InsightDetailsProvider = ({ children }) => {
  const {
    data,
    setData,
    error,
    loading,
    refetch,
    status,
    initialInterval,
    dateFilter,
    variables,
  } = useInsightInfoHook();

  const contextValue = useMemo(
    () => ({
      data,
      setData,
      error,
      loading,
      refetch,
      status,
      initialInterval,
      dateFilter,
      variables,
    }),
    [data, setData, error, loading, refetch, status, initialInterval, dateFilter, variables]
  );

  return <InsightDetailsContext.Provider value={contextValue}>{children}</InsightDetailsContext.Provider>;
};

const useInsightDetailsContext = () => useContext(InsightDetailsContext);

export { InsightDetailsProvider, useInsightDetailsContext };
