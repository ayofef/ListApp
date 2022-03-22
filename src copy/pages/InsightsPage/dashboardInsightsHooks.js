import { useEffect, useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { GET_DASHBOARD_INSIGHTS } from '../../utils/queries/dashboardInsights/dasboardInsightQueries';
import { globalLoadingConst } from '../../constants/globalLoadingConsts';
import { transformSearchParamsToFilter } from '../../utils/transformSearchParamsToFilter';
import useSearch from '../../hooks/useSearch';
import { UI_ROUTES } from '../../constants/routes';
import { useLoadingIndicator } from '../../hooks/useLoadingIndicator';
import { handleDetailsDateInterval, handleHomepageDateInterval } from './constant';
import { isDefined } from '../../utils/helpers';

export const getData = ({ filter }) => ({
  filter: (filter && transformSearchParamsToFilter(filter)) || null,
});

const now = moment();
export const utcFormattedDayStart = now.startOf('day').toISOString();
export const utcFormattedDayEnd = now.endOf('day').toISOString();

export const useGetChartData = () => {
  const [chartsData, setChartsData] = useState({});
  const [searchParams] = useSearch();
  const { pathname } = useLocation();
  const isHomePage = UI_ROUTES.insights === pathname;

  const intervalData = useMemo(() => {
    if (isHomePage) {
      return handleHomepageDateInterval(searchParams?.filter?.date);
    }
    return handleDetailsDateInterval(searchParams?.filter?.date);
  }, [searchParams, isHomePage]);

  const filter = useMemo(() => getData(searchParams)?.filter || {}, [searchParams]);

  const startDate =
    filter?.date?.value?.min ||
    (intervalData?.interval === 60
      ? utcFormattedDayStart
      : moment(utcFormattedDayStart)
          .subtract(7, 'd')
          .toISOString());
  const endDate = filter?.date?.value?.max || utcFormattedDayEnd;

  const variables = useMemo(() => {
    return {
      data: (filter && Object.keys(filter).length > 0 && { filter }) || undefined,
      intervalSize: intervalData?.interval,
      intervalTypeMonth: intervalData?.momentKey === 'month',
    };
  }, [intervalData, filter]);

  const { data, error, loading, refetch } = useQuery(GET_DASHBOARD_INSIGHTS, {
    variables,
    skip: !isDefined(filter?.date),
  });
  useLoadingIndicator(globalLoadingConst.dashboardInsights, loading);
  useEffect(() => {
    if (!loading && isEmpty(error)) {
      setChartsData(data?.getDashboardInsights || {});
    }
  }, [error, data, loading]);

  return {
    variables,
    chartsData,
    setChartsData,
    refetch,
    loading,
    initialInterval: intervalData?.interval,
    showDate: intervalData?.showDate,
    dateFilter: {
      startDate,
      endDate,
    },
  };
};
