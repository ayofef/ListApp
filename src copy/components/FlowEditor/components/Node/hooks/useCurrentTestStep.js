import { useEffect } from 'react';
import { useFlowEditorContext } from '../../../context';
import { TEST_NODE_TYPES, useFlowTestStep } from './useFlowTestStep';
import { requiredTestUserDecisionStepTypes } from '../../../types';

export const useCurrentTestStep = ({ stepId }) => {
  const {
    isAutomationTest,
    isAutomationTestInProgress,
    setSelectedElementId,
    currentTestStepId,
    setCurrentTestStepId,
    currentTestStep,
    examplesRequired,
    setExamplesRequired,
    setIsUserDecisionRequired,
    setIsOpenTestExamplesModal,
    testFlowInstance,
  } = useFlowEditorContext();
  const { testNodeType } = useFlowTestStep({ stepId });

  useEffect(() => {
    if (isAutomationTestInProgress && testNodeType && testNodeType === TEST_NODE_TYPES.inProgress) {
      setSelectedElementId(stepId);
      setCurrentTestStepId(stepId);
    }
  }, [stepId, isAutomationTestInProgress, setSelectedElementId, testNodeType, setCurrentTestStepId]);

  useEffect(() => {
    if (isAutomationTest) {
      setExamplesRequired(false);
      setIsUserDecisionRequired(false);
      const typename = currentTestStep?.__typename;
      if (
        isAutomationTestInProgress &&
        currentTestStep?.needsExamplesToTest &&
        testNodeType === TEST_NODE_TYPES.inProgress
      ) {
        setExamplesRequired(true);
        setIsOpenTestExamplesModal(true);
      }
      if (requiredTestUserDecisionStepTypes.includes(typename) && testNodeType === TEST_NODE_TYPES.inProgress) {
        setIsUserDecisionRequired(true);
      }
    }
  }, [
    stepId,
    currentTestStep?.__typename,
    isAutomationTest,
    isAutomationTestInProgress,
    setExamplesRequired,
    setIsOpenTestExamplesModal,
    setIsUserDecisionRequired,
    currentTestStep?.needsExamplesToTest,
    testFlowInstance,
    testNodeType,
  ]);

  return {
    currentTestStep,
    currentTestStepId,
    examplesRequired,
  };
};
