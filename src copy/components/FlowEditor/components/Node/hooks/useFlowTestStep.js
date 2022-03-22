import { useMemo } from 'react';
import { useFlowEditorContext } from '../../../context';
import { isFlowInstanceInError } from '../../../utils/flowInstanceStatus';

export const TEST_NODE_TYPES = {
  startTest: 'startTest',
  inProgress: 'inProgress',
  completed: 'completed',
  error: 'error',
};

export const useFlowTestStep = ({ stepId }) => {
  const { testFlowInstance } = useFlowEditorContext();
  const testStep = testFlowInstance?.steps.find((s) => s?.id === stepId);

  const testNodeType = useMemo(() => {
    if (stepId === 'completed-node') {
      return TEST_NODE_TYPES.completed;
    }
    if (stepId?.includes('test-')) {
      return TEST_NODE_TYPES.startTest;
    }
    if (stepId === testFlowInstance?.currentStep?.id) {
      if (isFlowInstanceInError(testFlowInstance)) {
        return TEST_NODE_TYPES.error;
      }
      return TEST_NODE_TYPES.inProgress;
    }
    if (testStep?.entered && testStep?.exited) {
      return TEST_NODE_TYPES.completed;
    }
    return null;
  }, [stepId, testFlowInstance, testStep?.entered, testStep?.exited]);

  return {
    testStep,
    testNodeType,
  };
};
