import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { number } from 'prop-types';
import THEME from '../../../constants/theme';

const ProgressBar = ({ value, maxValue, fullValue }) => {
  return (
    <ResponsiveContainer width={140} height={12}>
      <BarChart
        layout="vertical"
        data={[{ value: value, overMax: value - maxValue > 0 ? value - maxValue : 0, fullValue: fullValue - value }]}
        stackOffset="expand"
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 6,
        }}
      >
        <XAxis hide type="number" />
        <YAxis type="category" hide />
        <Bar dataKey="value" fill={THEME.primaryColors.black} stackId="a" animationDuration={1500} />
        <Bar dataKey="overMax" fill={THEME.statusColors.failed} stackId="a" animationDuration={1500} />
        <Bar dataKey="fullValue" fill={THEME.greyColors.grey5} stackId="a" animationDuration={1500} />
      </BarChart>
    </ResponsiveContainer>
  );
};

ProgressBar.propTypes = {
  value: number.isRequired,
  maxValue: number.isRequired,
  fullValue: number.isRequired,
};

export default ProgressBar;
