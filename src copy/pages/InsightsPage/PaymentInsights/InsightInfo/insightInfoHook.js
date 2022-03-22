import { useQuery } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import { mergeDeep } from '../../../../utils/mergeDeep';
import { GET_INSIGHTS_DETAILS } from '../../../../utils/queries/dashboardInsights/dasboardInsightQueries';
import { useGetChartData } from '../../dashboardInsightsHooks';
import { UI_ROUTES } from '../../../../constants/routes';

const STATUSES = ['intents', 'successful', 'canceled', 'declined', 'disputed', 'refunded', 'failed'];

const FILTER_STATUSES = {
  successful: ['AUTHORISED', 'SUCCEEDED'],
  canceled: ['CANCELLED'],
  declined: ['DECLINED'],
  disputed: ['DISPUTED'],
  refunded: ['REFUNDED'],
  failed: ['FAILED'],
};

const INTENT_FILTER = (filter) => ({
  active: {
    filter: {
      ...filter,
      intentStatus: {
        value: 'ACTIVE',
        selectedVerb: 'IS_EQUAL',
      },
    },
  },
  inactive: {
    filter: {
      ...filter,
      intentStatus: {
        value: 'INACTIVE',
        selectedVerb: 'IS_EQUAL',
      },
    },
  },
});

const useInsightInfoHook = () => {
  const { params } = useRouteMatch();
  const history = useHistory();
  const { variables, initialInterval, dateFilter } = useGetChartData();

  const [data, setData] = useState({});

  const getVariablesWithStatuses = useMemo(() => {
    if (params.status === 'intents') {
      return {
        ...omit(variables, 'data'),
        ...INTENT_FILTER(variables?.data?.filter || {}),
        activeIntervalSize: variables.intervalSize,
        inactiveIntervalSize: variables.intervalSize,

        byValue: {
          filter: {
            ...(variables?.data?.filter || {}),
          },
        },
      };
    }

    return mergeDeep(variables, {
      data: { filter: { status: { value: FILTER_STATUSES[params.status], selectedVerb: 'CONTAINS' } } },
    });
  }, [params.status, variables]);

  useEffect(() => {
    if (!STATUSES.includes(params.status)) {
      history.push(UI_ROUTES.insights);
    }
  }, [params, history]);

  const { data: _data, error, loading, refetch } = useQuery(GET_INSIGHTS_DETAILS(params.status), {
    variables: getVariablesWithStatuses,
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (!loading && isEmpty(error)) {
      setData(_data || {});
    }
  }, [error, _data, loading]);

  return {
    data,
    setData,
    error,
    loading,
    refetch,
    status: params?.status,
    initialInterval,
    dateFilter,
    variables: getVariablesWithStatuses,
  };
};

export default useInsightInfoHook;
