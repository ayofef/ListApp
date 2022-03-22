import React, { useMemo } from 'react';
import { bool, string } from 'prop-types';
import styled from 'styled-components';
import get from 'lodash/get';
import { Box } from '@material-ui/core';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { P } from '../../../components/atoms';
import { useInsightsContext } from '../context';
import ChevronRight from '../../../assets/icons/ChevronRight';
import THEME from '../../../constants/theme';
import { FlexSpaceBetween } from '../../../components/atoms/flex/FlexSpaceBetween';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';

const CommonStyledP = styled(P)`
  width: 100%;
  text-align: left;
`;

const Capitalized = styled(CommonStyledP)`
  text-transform: capitalize;
`;

const labelConst = {
  successful: 'Successful transactions',
  failed: 'Failed',
  processorsStats: 'Payment processors',
  methodsStats: 'Payment methods',
  countryStats: 'Country',
  'byValue.initiated': 'Initiated',
  'byValue.successful': 'Successful',
  'byValue.canceled': 'Canceled',
  'byValue.declined': 'Declined',
  'byValue.issues': 'Issues',
  'byValue.disputed': 'Disputes',
  'byValue.refunded': 'Refunded',
  'byValue.intents': 'Intents',
};

const StyledLink = styled(Link)`
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  text-align: right;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${THEME.primaryColors.primary};
  transition: all 0.3s ease-out;

  svg {
    path {
      stroke: ${THEME.primaryColors.primary};
    }
  }

  &:hover {
    color: ${THEME.secondaryColors.secondary};
    svg {
      path {
        color: ${THEME.secondaryColors.secondary};
      }
    }
  }
`;
const TableHeader = ({ dataKey, dataDisplayKey, status, withOutDetails = false }) => {
  const { search } = useLocation();
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const { chartsData } = useInsightsContext();
  const label = labelConst[dataKey];
  const chartData = get(chartsData, dataKey);
  const renderValue = useMemo(() => {
    if (Array.isArray(chartData)) {
      const invertedData = chartData.map((object) => Object.entries(object).map(([key, value]) => ({ key, value }))[0]);
      const sortedArray = invertedData.sort((a, b) => b.value - a.value);
      return sortedArray[0]
        ? `${sortedArray[0]?.key?.replace('_', ' ').toLowerCase() || ''} ${sortedArray[0].value || 0} %`
        : '';
    }
    return `${
      dataDisplayKey === 'total.rawAmount' ? chartData?.total?.formattedAmount || '0' : chartData?.countTotal || '0'
    }`;
  }, [chartData, dataDisplayKey]);
  return (
    <FlexSpaceBetween margin="0 0 16px 0">
      <Box>
        <CommonStyledP fontSize="14px" fontWeight={400} color="#787F88">
          {t(label)}
        </CommonStyledP>
        <Capitalized margin="8px 0 0 0" fontSize="18px" fontWeight={600} color="#232629">
          {renderValue}
        </Capitalized>
      </Box>
      {!withOutDetails && (
        <Box>
          <StyledLink to={`${path}/${status + search}`}>
            {t('More insight')}
            <FlexContainer margin=" 0 0 0 13px">
              <ChevronRight />
            </FlexContainer>
          </StyledLink>
        </Box>
      )}
    </FlexSpaceBetween>
  );
};

TableHeader.propTypes = {
  dataKey: string.isRequired,
  dataDisplayKey: string,
  withOutDetails: bool,
  status: string,
};

TableHeader.defaultProps = {
  dataDisplayKey: 'total',
  withOutDetails: false,
  status: null,
};

export default TableHeader;
