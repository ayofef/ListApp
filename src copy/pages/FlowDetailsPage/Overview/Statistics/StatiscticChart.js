import React from 'react';
import Box from '@material-ui/core/Box';
import { bool, string } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import { InsightLabel, InsightValue, NewButton, StyledInsightsChartRow } from './styled';
import TinyLineChart from '../../../../components/TinyLineChart';
import { MOCK_STATS } from '../../../../components/FlowsListCard/constant';
import { usePaymentFlowContext } from '../../paymentFlowContext';
import THEME from '../../../../constants/theme';

const StatisticChart = ({ label, statKey, sdkInstalled }) => {
  const { flowId, flowStats } = usePaymentFlowContext();

  return (
    <StyledInsightsChartRow>
      <Box>
        <InsightLabel>{label}</InsightLabel>
        <InsightValue>
          {!sdkInstalled && statKey === 'paymentIntents' ? 'No Data' : flowStats[statKey]?.countTotal ?? 0}
        </InsightValue>
      </Box>
      {!sdkInstalled && statKey === 'paymentIntents' ? (
        <Link to={`/flows/${flowId}/details/settings/checkout`}>
          <NewButton
            $height="32px"
            $background={THEME.greyColors.grey12}
            color={THEME.primaryColors.primary}
            fontSize="13px"
            fontWeight={600}
          >
            Setup Checkout
          </NewButton>
        </Link>
      ) : (
        <TinyLineChart
          data={isEmpty(flowStats[statKey]?.intervals) ? MOCK_STATS[statKey] : flowStats[statKey]?.intervals}
          width={140}
          dataKey="count"
        />
      )}
    </StyledInsightsChartRow>
  );
};

StatisticChart.propTypes = {
  label: string.isRequired,
  statKey: string.isRequired,
  sdkInstalled: bool,
};

StatisticChart.defaultProps = {
  sdkInstalled: false,
};

export default StatisticChart;
