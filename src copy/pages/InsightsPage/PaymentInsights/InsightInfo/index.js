import React, { useMemo } from 'react';
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';
import { string } from 'prop-types';
import Box from '@material-ui/core/Box';
import get from 'lodash/get';
import { useTranslation } from 'react-i18next';
import { P18B } from '../../../../components/atoms';
import { NumberBlock, NumberHeader, NumberValue } from './styled';
import InfoBlock from './InfoBlocks';
import { useInsightDetailsContext } from './context';
import BarChartComponent from './Charts/BarChartComponent';
import LineChartComponent from './Charts/LineChartComponent';
import { useGetPaymentGateways } from '../../../../hooks/useGetOptions';
import THEME from '../../../../constants/theme';
import { FEES_KEYS_MAP } from './InfoBlocks/constant';
import { INTENT_STATUS_MAP } from './constant';
import { FlexStart } from '../../../../components/atoms/flex/FlexStart';

const CUSTOM_API_DATA_KEY_MAP = {
  failed: 'failed',
};

const InsightInfo = ({ dataKey }) => {
  const { t } = useTranslation();
  const { data, loading: _loading, status } = useInsightDetailsContext();
  const { loading: gatewayLoading, paymentGateways } = useGetPaymentGateways();
  const loading = _loading || gatewayLoading;

  const apiDataKey = useMemo(() => CUSTOM_API_DATA_KEY_MAP[status] ?? `byValue.${status}`, [status]);

  const pageDataByValue = useMemo(() => get(data?.getDashboardInsights, apiDataKey), [
    apiDataKey,
    data?.getDashboardInsights,
  ]);

  return (
    <div>
      <FlexStart margin="32px 0">
        {!loading && (
          <NumberBlock>
            <NumberHeader>
              {t('Total')} {status}
            </NumberHeader>
            <NumberValue>{pageDataByValue?.countTotal || 0}</NumberValue>
          </NumberBlock>
        )}
        {!loading && (
          <NumberBlock>
            <NumberHeader>{t('Total value')}</NumberHeader>
            <NumberValue>{pageDataByValue?.total?.formattedAmount || 0}</NumberValue>
          </NumberBlock>
        )}
      </FlexStart>
      {status !== 'intents' && (
        <Grid container>
          <InfoBlock
            dataKey={dataKey}
            data={data?.getDashboardInsights?.processorsStats || []}
            name="Payment gateways"
            paymentGateways={paymentGateways}
            loading={loading}
          />
          <InfoBlock
            dataKey={dataKey}
            data={data?.getDashboardInsights?.methodsStats || []}
            name="Payment methods"
            central
            loading={loading}
          />
          <InfoBlock
            dataKey={dataKey}
            data={data?.getDashboardInsights?.countryStats || []}
            name="Countries"
            loading={loading}
          />
        </Grid>
      )}

      {status === 'declined' && (
        <>
          <BarChartComponent data={data?.getDashboardInsights?.declineCodeStats} status={status} loading={loading} />
          <Divider />
        </>
      )}
      {status === 'intents' ? (
        <>
          <LineChartComponent
            dataKey={dataKey}
            data={data?.active?.byValue?.[status]}
            label={`Total active ${status}`}
            loading={loading}
            status={status}
            intentStatus={INTENT_STATUS_MAP.active}
          />
          <LineChartComponent
            dataKey={dataKey}
            data={data?.inactive?.byValue?.[status]}
            label={`Total inactive ${status}`}
            loading={loading}
            status={status}
            intentStatus={INTENT_STATUS_MAP.inactive}
          />
        </>
      ) : (
        <>
          <LineChartComponent
            dataKey={dataKey}
            data={pageDataByValue}
            label={`Total ${status}`}
            loading={loading}
            status={status}
          />
          <Box mt="16px" mb="46px">
            <P18B margin="0 0 18px 0">{t('Fees')}</P18B>
            <Grid container>
              <InfoBlock
                dataKey={dataKey}
                data={data?.getDashboardInsights?.feeStats?.feeStats || []}
                name="Fees"
                loading={loading}
              />
              <InfoBlock
                dataKey={dataKey}
                data={data?.getDashboardInsights?.feeStats || []}
                name={FEES_KEYS_MAP.totalFees}
                central
                loading={loading}
              />
            </Grid>
          </Box>
          <Box mt="16px" mb="40px">
            <P18B margin="0 0 18px 0">{t('Cards')}</P18B>
            <Grid container>
              <InfoBlock
                dataKey={dataKey}
                data={data?.getDashboardInsights?.issuingStats || []}
                name="Issuing bank"
                loading={loading}
              />
              <InfoBlock
                dataKey={dataKey}
                data={data?.getDashboardInsights?.cardTypeStats || []}
                name="Card type"
                central
                loading={loading}
              />
              <InfoBlock
                dataKey={dataKey}
                data={data?.getDashboardInsights?.productTypeStats || []}
                name="Product type"
                loading={loading}
              />
            </Grid>
            <Grid container>
              <InfoBlock
                dataKey={dataKey}
                data={data?.getDashboardInsights?.cardCategoryStats || []}
                name="Card category"
                loading={loading}
                borderTopColor="transparent"
                borderRightColor={THEME.greyColors.grey5}
              />
            </Grid>
          </Box>
        </>
      )}

      <Divider />
    </div>
  );
};

InsightInfo.propTypes = {
  dataKey: string.isRequired,
};

export default InsightInfo;
