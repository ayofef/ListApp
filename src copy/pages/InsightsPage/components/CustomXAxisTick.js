import PropTypes from 'prop-types';
import React from 'react';
import isEmpty from 'lodash/isEmpty';

import { checkIsTickVisible } from './constant';

const CustomXAxisTick = ({ x, y, payload, renderDataLength, globalFilterState, indexesToHide }) => {
  const isLastTick = renderDataLength === payload?.index + 1;

  const isTickVisible = !isEmpty(indexesToHide)
    ? indexesToHide.includes(payload.index)
    : checkIsTickVisible({
        index: payload.index,
        renderDataLength,
        rightDrawerOpen: globalFilterState,
      });

  if (!isTickVisible) {
    return null;
  }

  return (
    <g transform={`translate(${isLastTick ? x - 24 : x},${y - 5})`}>
      <text x={0} y={0} dy={16} textAnchor="right" fill="#787F88">
        {payload?.value}
      </text>
    </g>
  );
};

CustomXAxisTick.propTypes = {
  payload: PropTypes.shape({
    index: PropTypes.number,
    value: PropTypes.string,
  }),
  renderDataLength: PropTypes.number.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  globalFilterState: PropTypes.bool.isRequired,
  indexesToHide: PropTypes.arrayOf(PropTypes.number),
};

CustomXAxisTick.defaultProps = {
  payload: null,
  indexesToHide: [],
  x: null,
  y: null,
};

export default CustomXAxisTick;
