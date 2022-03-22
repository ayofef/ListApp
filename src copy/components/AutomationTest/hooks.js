import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation } from '@apollo/client';
import { isNode } from 'react-flow-renderer';
import { useBoolState } from '../../hooks/useBoolState';
import { useEditorData } from '../../hooks/flowEditor/useEditorData';
import { GQL_M_TEST_FLOW, GQL_M_USER_INPUT_REQUEST } from '../../utils/queries/flows/mutations';
import { getLayoutedElements } from '../FlowEditor/utils/layout';

export const useFlowTest = ({ flowId }) => {
  const [hoverElementId, setHoverElementId] = useState(null);
  const [elements, setElements] = useState([]);
  const [initialState, setInitialState] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const { toggle: onValidate, bool: isValidateOn } = useBoolState(false);
  const [isAutomationTest, setIsAutomationTest] = useState(true);
  const [isAutomationTestInProgress, setIsAutomationTestInProgress] = useState(false);
  const [currentTestStepId, setCurrentTestStepId] = useState(null);
  const [examplesRequired, setExamplesRequired] = useState(false);
  const [isUserDecisionRequired, setIsUserDecisionRequired] = useState(null);
  const [selectedTestExample, setSelectedTestExample] = useState(null);
  const [testFlowInstance, setTestFlowInstance] = useState(null);
  const [isOpenTestExamplesModal, setIsOpenTestExamplesModal] = useState(false);
  const [testExamples, setTestExamples] = useState([]);
  const selectedElement = elements.find(({ id }) => selectedElementId === id);
  const selectedElementData = selectedElement?.data;
  const currentTestStep = elements.find(({ id }) => currentTestStepId === id)?.data;
  const {
    data,
    isDataReady,
    initialState: originalInitialState,
    publishedData,
    firstStepId,
    flowName,
    flowInstanceCount,
    flowStatus,
    loading,
    refetch,
  } = useEditorData(flowId);

  const [testFlow, { loading: testFlowLoading }] = useMutation(GQL_M_TEST_FLOW, {
    variables: { flowId },
    onCompleted: (testFlowData) => {
      setTestFlowInstance(testFlowData?.testFlow);
    },
  });
  const [userInputRequest, { loading: userInputRequestLoading }] = useMutation(GQL_M_USER_INPUT_REQUEST, {
    skip: !testFlowInstance?.id,
    onCompleted: (userInputData) => {
      setTestFlowInstance(userInputData?.userInput);
    },
  });

  useEffect(() => {
    if (isDataReady) {
      if (data.find((el) => isNode(el) && !el.position)) {
        setElements(getLayoutedElements(data));
      } else {
        setElements(data);
      }
      setInitialState(originalInitialState);
    }
  }, [data, isDataReady, originalInitialState]);

  const onTestExampleConfirm = useCallback(async () => {
    setExamplesRequired(false);
    setIsOpenTestExamplesModal(false);
    await userInputRequest({
      variables: {
        instanceId: testFlowInstance?.id,
        input: selectedTestExample?.asInput,
      },
    });
  }, [selectedTestExample?.asInput, testFlowInstance?.id, userInputRequest]);

  const onUserDecisionConfirm = useCallback(
    async (isSimulate) => {
      setIsUserDecisionRequired(false);
      await userInputRequest({
        variables: {
          instanceId: testFlowInstance?.id,
          input: {
            simulate: isSimulate,
          },
        },
      });
    },
    [testFlowInstance?.id, userInputRequest]
  );

  const context = useMemo(
    () => ({
      initialState,
      elements,
      selectedElementId,
      selectedElement,
      selectedElementData,
      setSelectedElementId,
      hoverElementId,
      setHoverElementId,
      publishedData,
      isValidateOn,
      isAutomationTest,
      setIsAutomationTest,
      isAutomationTestInProgress,
      setIsAutomationTestInProgress,
      testFlow,
      testFlowInstance,
      testFlowLoading,
      currentTestStep,
      currentTestStepId,
      setCurrentTestStepId,
      examplesRequired,
      setExamplesRequired,
      testExamples,
      setTestExamples,
      selectedTestExample,
      setSelectedTestExample,
      userInputRequestLoading,
      isUserDecisionRequired,
      setIsUserDecisionRequired,
      onUserDecisionConfirm,
      isOpenTestExamplesModal,
      setIsOpenTestExamplesModal,
      isDataReady,
      onTestExampleConfirm,
      flowId,
      flowName,
      flowStatus,
      flowInstanceCount,
      loading,
      refetch,
    }),
    [
      initialState,
      elements,
      selectedElementId,
      selectedElement,
      selectedElementData,
      hoverElementId,
      publishedData,
      isValidateOn,
      isAutomationTest,
      isAutomationTestInProgress,
      testFlow,
      testFlowInstance,
      testFlowLoading,
      currentTestStep,
      currentTestStepId,
      setCurrentTestStepId,
      examplesRequired,
      setExamplesRequired,
      testExamples,
      setTestExamples,
      selectedTestExample,
      setSelectedTestExample,
      userInputRequestLoading,
      isUserDecisionRequired,
      setIsUserDecisionRequired,
      onUserDecisionConfirm,
      isOpenTestExamplesModal,
      setIsOpenTestExamplesModal,
      isDataReady,
      onTestExampleConfirm,
      flowId,
      flowName,
      flowStatus,
      flowInstanceCount,
      loading,
      refetch,
    ]
  );

  return {
    context,
    initialState,
    elements,
    selectedElementData,
    selectedElementId,
    setSelectedElementId,
    hoverElementId,
    setHoverElementId,
    publishedData,
    isValidateOn,
    isAutomationTest,
    setIsAutomationTest,
    isAutomationTestInProgress,
    setIsAutomationTestInProgress,
    testFlow,
    testFlowInstance,
    testFlowLoading,
    currentTestStep,
    currentTestStepId,
    setCurrentTestStepId,
    examplesRequired,
    setExamplesRequired,
    testExamples,
    setTestExamples,
    selectedTestExample,
    setSelectedTestExample,
    userInputRequestLoading,
    isUserDecisionRequired,
    setIsUserDecisionRequired,
    onUserDecisionConfirm,
    isOpenTestExamplesModal,
    setIsOpenTestExamplesModal,
    onValidate,
    firstStepId,
    isDataReady,
    onTestExampleConfirm,
  };
};
