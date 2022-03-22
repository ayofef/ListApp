import React from 'react';
import { shape, string, number, bool } from 'prop-types';

const CustomBar = ({ stroke, fill, x, y, width, height, payload, noData }) => {
  return (
    <rect
      x={x - 0.8}
      y={y}
      height={height}
      stroke={stroke}
      rx="2"
      {...(payload?.value > 0 ? { width, fill } : { width: 6, fill: noData ? fill : '#4E40EF', radius: 120 })}
    />
  );
};

CustomBar.propTypes = {
  dataLength: number.isRequired,
  height: number,
  payload: shape({
    value: number,
  }),
  stroke: number,
  width: number,
  x: number,
  y: number,
  fill: string,
  noData: bool,
};

CustomBar.defaultProps = {
  height: 0,
  x: 0,
  y: 0,
  width: 0,
  stroke: 0,
  fill: 'currentColor',
  payload: null,
  noData: false,
};

export default CustomBar;
