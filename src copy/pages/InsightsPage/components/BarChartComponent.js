import React, { useMemo } from 'react';
import { shape, string, bool } from 'prop-types';
import { XAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, YAxis, Bar, Cell } from 'recharts';
import qs from 'qs';
import { useHistory } from 'react-router-dom';
import { v4 as uniqueID } from 'uuid';
import { BlockWrap, P, AbsoluteBlock } from '../../../components/atoms';
import CustomTooltip from './CustomTooltip';
import TableHeader from './TableHeader';
import { useInsightsContext } from '../context';
import { UI_ROUTES } from '../../../constants/routes';
import { STRINGIFY_OPTIONS } from '../../../hooks/useSearch';
import { utcFormattedDayEnd, utcFormattedDayStart } from '../dashboardInsightsHooks';
import { absoluteblockWidth } from './constant';
import { BarChartContainer } from './styled';
import { Spinner } from './Loader';
import CustomBar from './CustomBar';
import CustomYAxisTick from './CustomYAxisTick';

const others = {
  name: 'others',
  value: 0,
};

/**
 * In every rowsStructure, we pass in the position key -  [left | right| fullWidth] and add padding based on the position
 */
export const coverPadding = (config) =>
  config?.fullWidth ? '0' : `0 ${config.right ? '0' : '37px'} 0 ${config.left ? '0' : '37px'} `;

const queryKeys = {
  methodsStats: 'paymentMethod',
  processorsStats: 'paymentProcessor',
  countryStats: 'paymentCountry',
};

const BarChartComponent = ({ config = {} }) => {
  const { chartsData, loading } = useInsightsContext();
  const history = useHistory();

  const handleClick = (data) => {
    const params = {
      filter: {
        [queryKeys[config.key]]: [data.name && data.name.toLowerCase()],
        date: {
          gt: utcFormattedDayStart,
          lt: utcFormattedDayEnd,
        },
      },
    };
    history.push({ pathname: UI_ROUTES.payments, search: qs.stringify(params, STRINGIFY_OPTIONS) });
  };
  const renderedData = useMemo(() => {
    if (chartsData[config.key]?.length > 0) {
      const parsedData = chartsData[config.key].map((item) => {
        if (Object.keys(item).length > 0) {
          return { name: Object.keys(item)[0]?.toLocaleLowerCase(), value: item[Object.keys(item)[0]] };
        }
        return {};
      });

      return [...parsedData, others]?.sort((a, b) => b.value - a.value);
    }

    return [others];
  }, [chartsData, config.key]);

  const maxValue = Math.max(...renderedData.map((o) => o.value), 0);

  return (
    <BarChartContainer
      margin="0 0 20px 0"
      width="100%"
      height="100%"
      flexDirection="column"
      padding={loading ? '0' : coverPadding(config)}
    >
      <TableHeader dataKey={config.key} />
      <BlockWrap width="100%" flex={1} padding="0 34px 0 0">
        {loading ? (
          <Spinner top="2px" padding="20px 20px 0 0" />
        ) : (
          <>
            <ResponsiveContainer width="100%">
              <BarChart data={renderedData} layout="vertical" width={730} height={250}>
                <CartesianGrid horizontal={false} stroke="#E6E9EC" strokeDasharray="0" />

                <XAxis hide type="number" />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={CustomYAxisTick}
                  label={{ value: '0', position: 'insideBottomRight', dx: 10, dy: 20 }}
                  strokeWidth="1px"
                  stroke="#E6E9EC"
                />
                <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip payload={renderedData} />} />

                <Bar
                  barSize={5}
                  dataKey="value"
                  onClick={handleClick}
                  radius={20}
                  shape={<CustomBar dataLength={renderedData?.length} />}
                >
                  {renderedData.map((el) => (
                    <Cell
                      cursor="pointer"
                      fill={el.value === maxValue ? '#4E40EF' : '#C1C5CB'}
                      key={`cell-${uniqueID()}`}
                    />
                  ))}
                  <Cell cursor="pointer" fill="#C1C5CB" key={`cell-${uniqueID()}`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <AbsoluteBlock
              display="flex"
              justifyContent="space-between"
              width={absoluteblockWidth(config)}
              borderTop="1px solid #E6E9EC"
              bottom="-6px"
              padding="8px 0 0 0"
            >
              <P color="#787F88" margin="0 0 0 60px">
                0
              </P>
              <P color="#787F88" margin="0 -4px 0 0">
                $
              </P>
            </AbsoluteBlock>
          </>
        )}
      </BlockWrap>
    </BarChartContainer>
  );
};

BarChartComponent.propTypes = {
  config: shape({
    left: bool,
    right: bool,
    key: string,
  }).isRequired,
};

export default BarChartComponent;
