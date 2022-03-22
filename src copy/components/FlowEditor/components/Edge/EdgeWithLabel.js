import React from 'react';
import { shape, number, string } from 'prop-types';
import { getEdgeCenter } from 'react-flow-renderer';
import { Edge } from './Edge';
import { EdgeLabel } from './EdgeLabel';

const EdgeWithLabel = (props) => {
  const { id, sourceX, sourceY, targetX, targetY } = props;

  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <Edge {...props}>
      <EdgeLabel id={id} edgeCenterX={edgeCenterX} edgeCenterY={edgeCenterY} label="other" />
    </Edge>
  );
};

EdgeWithLabel.propTypes = {
  id: string.isRequired,
  source: string.isRequired,
  sourceHandleId: string,
  sourceX: number.isRequired,
  sourceY: number.isRequired,
  targetX: number.isRequired,
  targetY: number.isRequired,
  style: shape({}),
};

EdgeWithLabel.defaultProps = {
  style: {},
  sourceHandleId: null,
};

export { EdgeWithLabel };
