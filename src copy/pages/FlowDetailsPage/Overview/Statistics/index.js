import React from 'react';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { StyledStatWrapper, StyledInsightsButton } from './styled';
import { usePaymentFlowContext } from '../../paymentFlowContext';
import { L16B } from '../../../../components/atoms/Typography/L16B';
import { L14M } from '../../../../components/atoms';
import THEME from '../../../../constants/theme';
import { ArrowWrapper } from '../CardStages/styled';
import { ArrowRight } from '../../../../assets/icons';
import { UI_ROUTES } from '../../../../constants/routes';
import StatisticChart from './StatiscticChart';
import { GET_SDK_INSTALLED_INFO } from '../../../../utils/queries/flows/queries';

const STATS = [
  { label: 'Payment Intents', key: 'paymentIntents' },
  { label: 'Declined Payments', key: 'declinedPayments' },
  { label: 'Failed Payments', key: 'failedPayments' },
  { label: 'Successful Payments', key: 'successfulPayments' },
  { label: 'Payment Issues', key: 'issuesPayments' },
  { label: 'Refunded Payments', key: 'refundedPayments' },
];

const Statistics = () => {
  const { t } = useTranslation();
  const { flow } = usePaymentFlowContext();
  const { data } = useQuery(GET_SDK_INSTALLED_INFO);
  const history = useHistory();

  const handleViewAllStats = () => {
    const startDate = moment()
      .subtract(24, 'hours')
      .toISOString();
    const endDate = moment().toISOString();

    history.push(
      `${UI_ROUTES.insights}?filter[flowId]=${flow.id}&filter[date][gt]=${startDate}&filter[date][lt]=${endDate}`
    );
  };

  return (
    <StyledStatWrapper>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <L16B>Insights</L16B>
        <StyledInsightsButton onClick={handleViewAllStats}>
          <Box display="flex">
            <L14M color={THEME.primaryColors.primary}>{t('View all')}</L14M>
            <ArrowWrapper>
              <ArrowRight />
            </ArrowWrapper>
          </Box>
        </StyledInsightsButton>
      </Box>
      {STATS?.map(({ key, label }) => (
        <StatisticChart key={key} label={label} statKey={key} sdkInstalled={data?.we?.metadata?.sdkInstalled} />
      ))}
    </StyledStatWrapper>
  );
};

export default Statistics;
