import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line } from 'recharts';
import THEME from '../../constants/theme';

const TinyLineChart = ({ data, dataKey, margin, strokeWidth, width }) => {
  const isDataExist = useMemo(() => Boolean(data.find((item) => item.count > 0)), [data]);
  const strokeColor = isDataExist ? THEME.greyColors.grey9 : THEME.greyColors.grey4;
  return (
    <LineChart width={width} height={24} data={data} margin={margin}>
      <Line dot={false} type="monotone" dataKey={dataKey} stroke={strokeColor} strokeWidth={strokeWidth} />
    </LineChart>
  );
};

TinyLineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dataKey: PropTypes.string.isRequired,
  width: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    left: PropTypes.number,
    bottom: PropTypes.number,
  }),
  strokeWidth: PropTypes.number,
};
TinyLineChart.defaultProps = {
  margin: {
    top: 1,
    right: 0,
    left: 0,
    bottom: 1,
  },
  width: 145,
  strokeWidth: 2,
};
export default TinyLineChart;
