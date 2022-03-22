import { useMemo } from 'react';
import { isEdge } from 'react-flow-renderer';
import { nodeBaseStyles } from '../../../styled';
import { isFlowInstanceCompleted } from '../../../utils/flowInstanceStatus';
import { EDGE_TYPE_ID, NODE_TYPE, NODE_TYPE_ID } from '../../../utils/nodeTypes';

export const useFlowElements = ({
  elements,
  isAutomationTestInProgress,
  isUserDecisionRequired,
  testFlowInstance,
  currentTestStepId,
  firstStepId,
}) => {
  const reactFlowElements = useMemo(() => {
    if (!elements || !elements.length) {
      return [];
    }
    const flowElements = elements.map((element) => {
      if (isEdge(element)) {
        return element;
      }
      return {
        ...element,
        ...nodeBaseStyles,
        type: NODE_TYPE.basic,
      };
    });
    const firstElement = flowElements.find((el) => el.id === firstStepId);
    const startNodeX = firstElement?.position?.x - 120;
    const startNodeY = firstElement?.position?.y + 58;
    const startNode = {
      id: NODE_TYPE_ID.testNode,
      type: NODE_TYPE.startTest,
      data: {},
      position: { x: startNodeX, y: startNodeY },
    };
    const startEdge = {
      id: EDGE_TYPE_ID.testEdge,
      source: startNode?.id,
      target: firstStepId,
    };
    const baseElements = [{ ...startNode }, ...flowElements, { ...startEdge }];
    if (isAutomationTestInProgress) {
      const currentStepElement = flowElements.find((element) => element?.id === currentTestStepId);
      if (currentStepElement && isUserDecisionRequired) {
        const userDecisionNode = {
          id: NODE_TYPE_ID.decisionNode,
          type: NODE_TYPE.userDecision,
          data: {},
          position: { x: currentStepElement?.position?.x + 225 || 500, y: currentStepElement?.position?.y - 2 || 500 },
        };
        return [...baseElements, { ...userDecisionNode }];
      }
      if (isFlowInstanceCompleted(testFlowInstance)) {
        const lastElement = currentStepElement || flowElements?.find((element) => element?.data?.nextStepId === null);
        const completedNodeX = lastElement?.position?.x + 320;
        const completedNodeY = lastElement?.position?.y + 66;
        const completedNode = {
          id: NODE_TYPE_ID.completedNode,
          type: NODE_TYPE.completedTest,
          data: {},
          position: { x: completedNodeX, y: completedNodeY },
        };
        const completedEdge = {
          id: EDGE_TYPE_ID.completedEdge,
          source: lastElement?.id,
          target: completedNode?.id,
        };
        return [...baseElements, { ...completedNode }, { ...completedEdge }];
      }
    }
    return baseElements;
  }, [elements, isAutomationTestInProgress, isUserDecisionRequired, testFlowInstance, currentTestStepId, firstStepId]);

  return {
    reactFlowElements,
  };
};
