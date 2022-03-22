import React, { useMemo } from 'react';
import styled from 'styled-components';
import { arrayOf, bool, shape } from 'prop-types';
import { XAxis, CartesianGrid, ResponsiveContainer, BarChart, YAxis, Bar, Cell, Tooltip } from 'recharts';
import { v4 as uniqueID } from 'uuid';
import isEmpty from 'lodash/isEmpty';
import { coverPadding } from '../../../components/BarChartComponent';
import { BlockWrap } from '../../../../../components/atoms';
import { Spinner } from '../../../components/Loader';
import ChartHeader from './Component/ChartHeader';
import CustomTooltip from '../../../components/CustomTooltip';
import CustomYAxisTick from '../../../components/CustomYAxisTick';
import CustomBar from '../../../components/CustomBar';
import { MOCK_BAR_CHART_DATA } from '../../../constant';
import { FlexContainer } from '../../../../../components/atoms/flex/FlexContainer';

const ChartWrapper = styled.div`
  .recharts-cartesian-axis-tick-line {
    stroke: none;
  }
  .recharts-cartesian-axis-line {
    stroke: #e6e9ec;
  }
  .recharts-yAxis {
    .recharts-cartesian-axis-line {
      stroke: none;
    }
    .recharts-cartesian-axis-tick-line {
      stroke: ${({ noData }) => (noData ? '#E6E9EC' : ' #9ca0ff')};
      stroke-width: 0;
    }
    .recharts-cartesian-axis-tick-value {
      text-anchor: start;
      transform: translateX(-110px);
    }
  }
`;

const BarChartComponent = ({ data = [], loading }) => {
  const bottomLine = document.getElementsByClassName('recharts-cartesian-axis-line')[0];

  if (bottomLine) {
    bottomLine.setAttribute('x1', '90');
  }

  const renderData = useMemo(() => {
    return data
      .map((item) => {
        const objKey = Object.keys(item)[0];
        return {
          name: objKey,
          value: item[objKey].rawAmount / 100,
          uniqueID: `cell-${uniqueID()}`,
          formattedAmount: item[objKey].formattedAmount,
        };
      })
      .sort((a, b) => {
        return b.value - a.value;
      });
  }, [data]);

  const noData = useMemo(() => isEmpty(renderData), [renderData]);

  return (
    <ChartWrapper noData={noData}>
      <FlexContainer
        margin="16px 0 20px 0"
        width="100%"
        height="450px"
        flexDirection="column"
        padding={loading ? '0' : coverPadding('right')}
      >
        <ChartHeader label="Decline reasons" />
        <BlockWrap width="100%" flex={1} padding="0 0 20px 0">
          {loading && <Spinner top="2px" padding="20px 20px 0 0" />}
          {!loading && (
            <ResponsiveContainer width="100%">
              <BarChart data={noData ? MOCK_BAR_CHART_DATA() : renderData} layout="vertical" width="100%" height={400}>
                <CartesianGrid horizontal={false} stroke="#E6E9EC" strokeDasharray="0" />
                <XAxis type="number" dataKey="value" interval={0} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={CustomYAxisTick}
                  strokeWidth="1px"
                  stroke="#E6E9EC"
                  width={120}
                />
                {!noData && (
                  <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip payload={renderData} />} />
                )}
                <Bar
                  barSize={5}
                  dataKey="value"
                  shape={
                    <CustomBar
                      noData={noData}
                      dataLength={noData ? MOCK_BAR_CHART_DATA()?.length : renderData?.length}
                    />
                  }
                >
                  {noData &&
                    MOCK_BAR_CHART_DATA().map((item) => <Cell cursor="pointer" fill="#E6E9EC" key={item.uniqueID} />)}
                  {!noData && renderData.map((item) => <Cell cursor="pointer" fill="#9CA0FF" key={item.uniqueID} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </BlockWrap>
      </FlexContainer>
    </ChartWrapper>
  );
};

BarChartComponent.propTypes = {
  data: arrayOf(shape({})).isRequired,
  loading: bool.isRequired,
};

export default BarChartComponent;
