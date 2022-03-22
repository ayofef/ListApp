import React from 'react';
import { number, string } from 'prop-types';
import { StyledEdgeText } from './styled';

const EdgeLabel = ({ edgeCenterX, edgeCenterY, label }) => (
  <StyledEdgeText
    x={edgeCenterX}
    y={edgeCenterY}
    label={label}
    labelStyle={{ fill: '#787F88' }}
    labelShowBg
    labelBgStyle={{ fill: '#f5f6f7' }}
    labelBgPadding={[9, 5]}
    labelBgBorderRadius={2}
  />
);

EdgeLabel.propTypes = {
  edgeCenterX: number.isRequired,
  edgeCenterY: number.isRequired,
  label: string.isRequired,
};

export { EdgeLabel };
