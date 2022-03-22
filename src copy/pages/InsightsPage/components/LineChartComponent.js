import React, { useMemo, useState } from 'react';
import { bool, string, shape } from 'prop-types';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import moment from 'moment';
import get from 'lodash/get';
import { BlockWrap } from '../../../components/atoms';
import CustomTooltip from './CustomTooltip';
import TableHeader from './TableHeader';
import { ChartContainer } from './styled';
import { useInsightsContext } from '../context';
import { LabelAsPoint } from './LineChartClickableDotComponent';
import { coverPadding } from './BarChartComponent';
import { Spinner } from './Loader';
import { useRightAsideContext } from '../../../providers/RightAsideProvider';
import { MAX_SHOW_TIME_INTERVAL_MINUTES, DISPLAY_DATE_AND_TIME_KEY } from '../constant';
import { isDefined } from '../../../utils/helpers';
import CustomXAxisTick from './CustomXAxisTick';
import { getIndexesToHide, generateArray } from './constant';

const STROKE_COLOR_MAP = {
  failed: '#DF5B5B',
  'byValue.disputed': '#DF5B5B',
  'byValue.declined': '#DF5B5B',
};

const MAX_HOMEPAGE_TICKS = 6;

const LineChartComponent = ({ config = {}, dataKey }) => {
  const { chartsData, initialInterval, loading, showDate } = useInsightsContext();
  const { globalFilterState } = useRightAsideContext();
  const [dotHovered, setHover] = useState(false);
  const chartIncome = get(chartsData, config.key);

  /**
   * Handles Chart tooltip
   * if initialInterval (interval sent to BE) is less than MAX_SHOW_TIME_INTERVAL_MINUTES, show time
   */
  const showTooltipTime = initialInterval <= MAX_SHOW_TIME_INTERVAL_MINUTES;

  /**
   * Handles Chart label
   * Scenario 1 - set showTime to false if showDate is true
   * Scenario 2 - if showDate is false/undefined, use showTooltipTime value
   */
  const showTime = isDefined(showDate) ? !showDate : showTooltipTime;

  const renderData = useMemo(() => {
    return (chartIncome?.intervals || []).map((item) => {
      const updatedItem = { ...item };
      if (isDefined(item?.interval?.[DISPLAY_DATE_AND_TIME_KEY])) {
        updatedItem.date = moment(item?.interval?.[DISPLAY_DATE_AND_TIME_KEY])
          .local()
          .format(showTime ? 'HH:mm' : 'D MMM');
      } else {
        updatedItem.date = '-';
      }
      return updatedItem;
    });
  }, [chartIncome, showTime]);

  const domainRange = useMemo(() => {
    if (dataKey === 'count') {
      return [0, 'dataMax + 10'];
    }
    return [0, (dataMax) => (dataMax ? dataMax / 2 + dataMax : 10)];
  }, [dataKey]);

  const indexesToHide = getIndexesToHide(generateArray(renderData?.length), MAX_HOMEPAGE_TICKS);

  return (
    <ChartContainer
      width="100%"
      height="100%"
      flexDirection="column"
      padding={loading ? '0' : coverPadding(config)}
      dotColor={STROKE_COLOR_MAP[config?.key] || '#4E40EF'}
    >
      <TableHeader dataKey={config.key} status={config.status} dataDisplayKey={dataKey} />
      <BlockWrap width="100%" flex={1}>
        {loading ? (
          <Spinner top="-16px" />
        ) : (
          <BlockWrap width="100%" height="100%">
            <ResponsiveContainer width="100%">
              <LineChart width={730} height={240} data={renderData}>
                <CartesianGrid horizontal={false} stroke="#E6E9EC" strokeDasharray="0" />

                <XAxis
                  dataKey="date"
                  axisLine={{ stroke: '#E6E9EC', strokeWidth: '1px' }}
                  tick={
                    <CustomXAxisTick
                      renderDataLength={renderData.length}
                      globalFilterState={globalFilterState}
                      indexesToHide={indexesToHide}
                    />
                  }
                  strokeWidth="1px"
                  stroke="#E6E9EC"
                  domain={['auto', 'auto']}
                  interval={0}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip dataKey={dataKey} showTime={showTooltipTime} />} />
                <YAxis type="number" domain={domainRange} hide />
                <Line
                  label={
                    <LabelAsPoint
                      status={config.status}
                      isIntent={config.isIntent}
                      setHover={setHover}
                      renderData={renderData}
                    />
                  }
                  activeDot={false}
                  strokeWidth={1.5}
                  strokeOpacity={dotHovered ? 0.2 : 1}
                  type="monotone" // TODO: for consistency, use same type on both charts and revert back when distortion bug is fixed
                  dataKey={dataKey ? `${dataKey}` : 'total.rawAmount'}
                  stroke={STROKE_COLOR_MAP[config?.key] || '#4E40EF'}
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </BlockWrap>
        )}
      </BlockWrap>
    </ChartContainer>
  );
};

LineChartComponent.propTypes = {
  config: shape({
    key: string.isRequired,
    left: bool,
    right: bool,
    isIntent: bool,
  }).isRequired,
  dataKey: string.isRequired,
};

export default LineChartComponent;
