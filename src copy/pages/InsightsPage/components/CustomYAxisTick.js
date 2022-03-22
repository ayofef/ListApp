import React from 'react';
import PropTypes from 'prop-types';

const CustomYAxisTick = ({ y, payload }) => {
  if (payload?.value === 'mock') {
    return (
      <g transform={`translate(${0},${y})`}>
        <rect x={0} y={-2} width={90} height={5} stroke={3} rx="2" fill="#E6E9EC" />
      </g>
    );
  }
  return payload?.value ? (
    <g transform={`translate(${0},${y + 4})`}>
      <text key={payload?.value} x={0} y={17 * payload?.index} textAnchor="start" fill="#666">
        {payload?.value}
      </text>
    </g>
  ) : null;
};

CustomYAxisTick.propTypes = {
  y: PropTypes.number.isRequired,
  payload: PropTypes.shape({
    value: PropTypes.string,
    index: PropTypes.number,
  }).isRequired,
};

export default CustomYAxisTick;
