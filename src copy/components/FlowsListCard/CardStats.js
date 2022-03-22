import { Box, capitalize } from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { P12, P14B } from '../atoms';
import TinyLineChart from '../TinyLineChart';
import { MOCK_STATS } from './constant';
import { StatsLoadingState } from './LoadingState';

const DICTIONARY = {
  paymentIntents: 'Payment Intents',
  declinedPayments: 'Declined Payments',
  failedPayments: 'Failed Payments',
  successfulPayments: 'Successful Payments',
  issuesPayments: 'Payment Issues',
  refundedPayments: 'Refunded Payments',
};

export const appendMockdata = (data, key) => {
  // if data?.length is < 24, the line charts curls up
  if (data?.length < 24) {
    return [...MOCK_STATS[key], ...data];
  }
  return data;
};

const CardStats = ({ flowStats, loading }) => {
  const { t } = useTranslation();
  const charts = Object.keys(DICTIONARY);

  return (
    <Box display="flex" p="24px" justifyContent="space-between" overflow="auto">
      {loading && <StatsLoadingState />}
      {!loading &&
        charts?.map(
          (key, index) =>
            flowStats[key] &&
            Array.isArray(flowStats[key]?.intervals) && (
              <Box key={key} mr={index === charts.length - 1 ? 0 : '24px'}>
                <Box mb="4px">
                  <P12 color="#787F88">{capitalize(t(DICTIONARY[key] ?? key))}</P12>
                </Box>
                <P14B>{flowStats[key]?.countTotal ?? 0}</P14B>
                <TinyLineChart
                  data={
                    isEmpty(flowStats[key]?.intervals)
                      ? MOCK_STATS[key]
                      : appendMockdata(flowStats[key]?.intervals, key)
                  }
                  dataKey="count"
                />
              </Box>
            )
        )}
    </Box>
  );
};

const TOTAL_TYPES = PropTypes.shape({
  rawAmount: PropTypes.number,
  currency: PropTypes.string,
  formattedAmount: PropTypes.string,
});

const STATS_TYPES = PropTypes.shape({
  countTotal: PropTypes.number,
  total: TOTAL_TYPES,
  intervals: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number,
      total: TOTAL_TYPES,
      intervals: PropTypes.shape({
        end: PropTypes.string,
        start: PropTypes.string,
      }),
    })
  ),
});

CardStats.propTypes = {
  flowStats: PropTypes.shape({
    inactivePayments: STATS_TYPES,
    successfulPayments: STATS_TYPES,
    failedPayments: STATS_TYPES,
    paymentIssues: STATS_TYPES,
    paymentIntents: STATS_TYPES,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CardStats;
