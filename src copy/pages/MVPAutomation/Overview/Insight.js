import React from 'react';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import { arrayOf, bool, func, number, oneOfType, shape, string } from 'prop-types';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Grid from '@material-ui/core/Grid';
import { useWindowSize } from 'react-use';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import Skeleton from '@material-ui/lab/Skeleton';
import { L10BU } from '../../../components/atoms/Typography/L10BU';
import { L16B } from '../../../components/atoms/Typography/L16B';
import THEME from '../../../constants/theme';
import LinkWithArrow from './LinkWithArrow';
import { MOCK_STATS } from '../../../components/FlowsListCard/constant';
import TinyLineChart from '../../../components/TinyLineChart';
import ProgressBar from './ProgressBar';
import ConnectionsIcons from './ConnectionsIcons';
import { usePaymentFlowContext } from '../../FlowDetailsPage/paymentFlowContext';

const Wrapper = styled(Grid)`
  cursor: pointer;
`;

const Insight = ({
  title,
  value,
  maxValue,
  fullValue,
  borderRight,
  borderBottom,
  onClick,
  connections,
  fullWidth,
  paymentsLoading,
}) => {
  const { loading } = usePaymentFlowContext();
  const { t } = useTranslation();
  const { width } = useWindowSize();

  return (
    <Wrapper item xs={width < 1200 || fullWidth ? 12 : 6} onClick={onClick}>
      <Box
        display="flex"
        alignItems="center"
        p="24px"
        cursor="pointer"
        borderRight={borderRight ? `1px solid ${THEME.greyColors.grey5}` : 'none'}
        borderBottom={borderBottom ? `1px solid ${THEME.greyColors.grey5}` : 'none'}
      >
        {loading || paymentsLoading ? (
          <Box display="flex" flex={1} justifyContent="space-between">
            <Box width="120px" height="40px" borderRadius="8px" overflow="hidden" mr="16px">
              <Skeleton variant="rect" height="73px" width="100%" animation="wave" />
            </Box>
            <Box width="120px" height="40px" borderRadius="8px" overflow="hidden" mr="16px">
              <Skeleton variant="rect" height="73px" width="100%" animation="wave" />
            </Box>
          </Box>
        ) : (
          <>
            <Box flex={1}>
              <L10BU margin="0px 0px 4px 0">{title}</L10BU>
              <Box display="flex">
                <Box mr={maxValue ? '4px' : '0'}>
                  <L16B mr="8px">{value}</L16B>
                </Box>
                {maxValue && <L16B color={THEME.greyColors.grey8}>/ {maxValue}</L16B>}
              </Box>
            </Box>
            <Box>
              {title.toLowerCase() !== 'payment connections' ? (
                <Box display="flex" alignItems="center">
                  {title.toLowerCase() === 'payment transactions' ? (
                    <ProgressBar maxValue={maxValue} value={value} fullValue={fullValue || maxValue} />
                  ) : (
                    <TinyLineChart data={MOCK_STATS.paymentIntents} width={140} dataKey="count" />
                  )}
                  <Box ml="40px" fontSize="12px">
                    <ArrowForwardIosIcon fontSize="inherit" />
                  </Box>
                </Box>
              ) : (
                <Box display="flex">
                  {isEmpty(connections) ? (
                    <LinkWithArrow title={t('Add connection')} onClick={onClick} />
                  ) : (
                    <Box display="flex" alignItems="center">
                      <ConnectionsIcons connections={connections} />
                      <Box ml="40px" fontSize="12px">
                        <ArrowForwardIosIcon fontSize="inherit" />
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>
    </Wrapper>
  );
};

Insight.propTypes = {
  title: string.isRequired,
  value: oneOfType([string, number]),
  maxValue: oneOfType([string, number]),
  fullValue: oneOfType([string, number]),
  connections: arrayOf(shape({})),
  onClick: func.isRequired,
  borderRight: bool,
  borderBottom: bool,
  fullWidth: bool,
  paymentsLoading: bool,
};

Insight.defaultProps = {
  connections: [],
  fullValue: null,
  value: null,
  maxValue: null,
  borderRight: false,
  borderBottom: false,
  fullWidth: false,
  paymentsLoading: false,
};

export default Insight;
