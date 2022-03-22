import React, { useCallback } from 'react';
import { shape, number, string, bool } from 'prop-types';
import { getMarkerEnd, getSmoothStepPath } from 'react-flow-renderer';
import isNil from 'lodash/isNil';
import { useFlowEditorContext } from '../../context';
import { getEdgeColor } from '../../utils/getEdgeColor';
import { StyledPath } from './styled';
import { TEST_NODE_TYPES, useFlowTestStep } from '../Node/hooks/useFlowTestStep';

const Edge = (props) => {
  const {
    id,
    source,
    sourceHandleId,
    sourceX,
    sourceY,
    target,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    arrowHeadType,
    markerEndId,
    children,
    edgeError,
  } = props;
  const {
    selectedElementId,
    hoverElementId,
    setHoverElementId,
    isAutomationTest,
    isAutomationTestInProgress,
    isFlowMonitor,
    elements,
  } = useFlowEditorContext();
  const color = getEdgeColor(
    { source, id, sourceHandleId },
    selectedElementId,
    hoverElementId,
    isAutomationTest,
    edgeError
  );
  const { testNodeType } = useFlowTestStep({ stepId: source });
  const { testNodeType: targetNodeType } = useFlowTestStep({ stepId: target });

  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 0,
  });

  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  const mouseEventHandler = (value) => {
    if (isAutomationTest || isFlowMonitor) {
      return;
    }
    setHoverElementId(value);
  };

  const showStyledPath = useCallback(() => {
    const findNode = (idToCompare, key) => elements.find((item) => item.id === idToCompare && !isNil(item.data[key]));
    if (isFlowMonitor) {
      const isExitedSource = !isNil(findNode(source, 'exited'));
      const isEnteredTarget = !isNil(findNode(target, 'entered'));
      if (isExitedSource && isEnteredTarget) {
        return true;
      }
    }
    if (!isAutomationTestInProgress) {
      return false;
    }
    return (
      (testNodeType === TEST_NODE_TYPES.startTest || testNodeType === TEST_NODE_TYPES.completed) &&
      (targetNodeType === TEST_NODE_TYPES.inProgress || targetNodeType === TEST_NODE_TYPES.completed)
    );
  }, [elements, isAutomationTestInProgress, isFlowMonitor, source, target, targetNodeType, testNodeType]);

  return (
    <>
      <path
        onMouseEnter={() => mouseEventHandler(id)}
        onMouseLeave={() => mouseEventHandler(null)}
        id={id}
        style={{ stroke: color, 'stroke-width': 2, ...style }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      {children}
      {showStyledPath() && <StyledPath id={id} className="react-flow__edge-path" d={edgePath} />}
    </>
  );
};

Edge.propTypes = {
  id: string.isRequired,
  source: string.isRequired,
  sourceHandleId: string,
  sourceX: number.isRequired,
  sourceY: number.isRequired,
  target: string.isRequired,
  targetX: number.isRequired,
  targetY: number.isRequired,
  sourcePosition: string.isRequired,
  targetPosition: string.isRequired,
  arrowHeadType: string,
  markerEndId: string,
  style: shape({}),
  edgeError: bool,
};

Edge.defaultProps = {
  style: {},
  sourceHandleId: null,
  edgeError: false,
  markerEndId: null,
  arrowHeadType: null,
};

export { Edge };
