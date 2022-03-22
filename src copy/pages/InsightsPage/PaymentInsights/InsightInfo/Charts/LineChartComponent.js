import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import moment from 'moment';
import { useScrollbarWidth } from 'react-use';
import { ChartContainer, HiddenScrollTack } from '../../../components/styled';
import { BlockWrap } from '../../../../../components/atoms';
import { Spinner } from '../../../components/Loader';
import { StyledScrollbars } from '../../../../Payments/CommentsDrawerContent/styled';
import ChartHeader from './Component/ChartHeader';
import { LabelAsPoint } from '../../../components/LineChartClickableDotComponent';
import CustomTooltip from '../../../components/CustomTooltip';
import {
  DATA_IS_EMPTY,
  MOCK_CHART_DATA,
  MAX_SHOW_TIME_INTERVAL_MINUTES,
  DISPLAY_DATE_AND_TIME_KEY,
} from '../../../constant';
import CustomXAxisTick from '../../../components/CustomXAxisTick';
import { isDefined } from '../../../../../utils/helpers';

import ControlBlock from '../../../components/ControlBlock';
import { useRightAsideContext } from '../../../../../providers/RightAsideProvider';

const HORIZONTAL_SCROLLBAR_MIN_DATA_LENGTH = 25;

const LineChartComponent = ({ label, data, loading, status, dataKey, intentStatus }) => {
  const [dotHovered, setHover] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const { globalFilterState } = useRightAsideContext();
  const [isChartDataLoading, setIsChartDataLoading] = useState(false);
  const browserScrollbarWidth = useScrollbarWidth();
  const hasBrowserScrollbar = !!browserScrollbarWidth && browserScrollbarWidth > 0;

  const renderData = useMemo(() => {
    return (data?.intervals || []).map((item) => {
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
  }, [data?.intervals, showTime]);

  const isMockData = useMemo(() => DATA_IS_EMPTY(renderData), [renderData]);

  const handleIntervalChange = (interval) => {
    const newShowTime = interval <= MAX_SHOW_TIME_INTERVAL_MINUTES;
    setShowTime(newShowTime);
  };

  const handleChartDataLoadingChange = (isLoading) => {
    setIsChartDataLoading(isLoading);
  };

  const hasHorizontalScrollbar = isMockData ? false : renderData.length >= HORIZONTAL_SCROLLBAR_MIN_DATA_LENGTH;
  // WORKAROUND: force horizontal scrollbar if browser native scrollbar is hidden by default
  // NOTE: doesn't work in Firefox
  const forceHorizontalScrollbar = hasHorizontalScrollbar && !hasBrowserScrollbar;
  const blockWrapWidth = !hasHorizontalScrollbar
    ? '100%'
    : `${100 * (renderData.length / HORIZONTAL_SCROLLBAR_MIN_DATA_LENGTH)}%`;

  return (
    <ChartContainer
      width="100%"
      height="400px"
      flexDirection="column"
      margin="34px 0 0 0"
      dotColor="#4E40EF"
      isMockData={isMockData}
    >
      <ChartHeader label={label} value={dataKey === 'count' ? data?.countTotal : data?.total?.formattedAmount} />
      <BlockWrap width="100%" flex={1} margin={loading ? '0' : '0 0 0 -36px'} padding="0 0 20px 0">
        {loading || isChartDataLoading ? (
          <Spinner top="-16px" />
        ) : (
          <StyledScrollbars
            className={forceHorizontalScrollbar ? 'forced-horizontal-scrollbar' : 'scrollbar'}
            renderTrackVertical={() => <HiddenScrollTack />}
            {...(!hasHorizontalScrollbar ? { renderTrackHorizontal: () => <HiddenScrollTack /> } : {})}
          >
            <BlockWrap width={blockWrapWidth} height="100%">
              <ResponsiveContainer width="100%">
                <LineChart
                  width={730}
                  height={240}
                  data={isMockData ? MOCK_CHART_DATA : renderData}
                  margin={{ left: 20, right: 20, top: 5, bottom: 0 }}
                >
                  <CartesianGrid horizontal={false} stroke="#E6E9EC" strokeDasharray="0" />

                  <XAxis
                    dataKey="date"
                    axisLine={{ stroke: '#E6E9EC', strokeWidth: '1px' }}
                    tick={
                      <CustomXAxisTick renderDataLength={renderData.length} globalFilterState={globalFilterState} />
                    }
                    interval={0}
                    tickLine={false}
                    strokeWidth="1px"
                    stroke="#E6E9EC"
                  />
                  {!isMockData && <Tooltip content={<CustomTooltip dataKey={dataKey} showTime={showTime} />} />}
                  <YAxis hide domain={[0, isMockData ? 900 : (dataMax) => dataMax / 2 + dataMax]} />
                  <Line
                    label={
                      <LabelAsPoint
                        status={status}
                        isIntent={status === 'intents'}
                        setHover={setHover}
                        renderData={renderData}
                        intentStatus={intentStatus}
                      />
                    }
                    activeDot={false}
                    strokeWidth={1.5}
                    strokeOpacity={dotHovered ? 0.2 : 1}
                    type="monotone" //TODO: investigate why type="linear" shows a distortion on the ui
                    dataKey={isMockData ? 'total.rawAmount' : dataKey}
                    stroke={isMockData ? '#E6E9EC' : '#4E40EF'}
                    connectNulls
                  />

                  {isMockData && (
                    <Line
                      label={
                        <LabelAsPoint
                          status={status}
                          dataKey={`byValue.${status}`}
                          isIntent={status === 'intents'}
                          setHover={setHover}
                        />
                      }
                      activeDot={false}
                      strokeWidth={1.5}
                      strokeOpacity={dotHovered ? 0.2 : 1}
                      type="monotone"
                      dataKey="total.secondRawAmount"
                      stroke="rgba(230, 233, 236, .5)"
                      connectNulls
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </BlockWrap>
          </StyledScrollbars>
        )}
      </BlockWrap>

      {!loading && !isMockData && (
        <ControlBlock
          dataKey={`byValue.${status}`}
          onIntervalChange={handleIntervalChange}
          onLoadingChange={handleChartDataLoadingChange}
          intentStatus={intentStatus}
        />
      )}
    </ChartContainer>
  );
};

LineChartComponent.propTypes = {
  label: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  data: PropTypes.shape({
    total: PropTypes.shape({
      rawAmount: PropTypes.number,
      currency: PropTypes.string,
      formattedAmount: PropTypes.string,
    }),
    currency: PropTypes.string,
    countTotal: PropTypes.number,
    intervals: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  intentStatus: PropTypes.string,
};

LineChartComponent.defaultProps = {
  data: null,
  intentStatus: undefined,
};

export default LineChartComponent;
