import React, { useState } from 'react';
import { shape, number, string, bool } from 'prop-types';
import { getEdgeCenter } from 'react-flow-renderer';
import { useFlowEditorContext } from '../../context';
import { Edge } from './Edge';
import { IfElseEdgeButton } from './IfElseEdgeButton';

const EdgeWithIfElseButton = (props) => {
  const { id, sourceX, sourceY, targetX, targetY, source, target, edgeError } = props;
  const { isAutomationTest, isFlowMonitor } = useFlowEditorContext();
  const [isShowEdgeButton] = useState(true);

  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <Edge {...props}>
      {!isFlowMonitor && !isAutomationTest && isShowEdgeButton && (
        <IfElseEdgeButton
          id={id}
          edgeCenterX={edgeCenterX}
          edgeCenterY={edgeCenterY}
          stepId={source}
          targetId={target}
          edgeError={edgeError}
        />
      )}
    </Edge>
  );
};

EdgeWithIfElseButton.propTypes = {
  id: string.isRequired,
  source: string.isRequired,
  target: string.isRequired,
  sourceHandleId: string,
  sourceX: number.isRequired,
  sourceY: number.isRequired,
  targetX: number.isRequired,
  targetY: number.isRequired,
  sourcePosition: string.isRequired,
  targetPosition: string.isRequired,
  arrowHeadType: string,
  markerEndId: string.isRequired,
  edgeError: bool,
  style: shape({}),
};

EdgeWithIfElseButton.defaultProps = {
  style: {},
  sourceHandleId: null,
  edgeError: false,
  arrowHeadType: null,
};

export { EdgeWithIfElseButton };
