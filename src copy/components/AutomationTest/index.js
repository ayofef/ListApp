import ReactFlow, { ReactFlowProvider } from 'react-flow-renderer';
import React, { useCallback, useRef } from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { string } from 'prop-types';
import { nodeTypes } from '../FlowEditor/utils/nodeTypes';
import { edgeTypes } from '../FlowEditor/utils/edgeTypes';
import { FlowEditorContextProvider } from '../FlowEditor/context';
import { CanvasContainer } from '../FlowEditor/styled';
import { FlowHeader } from '../FlowHeader';
import { CircularLoader } from '../atoms';
import { FlowTestDetailsDrawer } from './AutomationTestDetailsDrawer';
import TestExamplesModal from './TestExamplesModal';
import { useFlowElements } from '../FlowEditor/components/Node/hooks/useFlowElements';
import { useFlowTest } from './hooks';
import FlowEmptyState from '../FlowEmptyState/FlowEmptyState';

const AutomationTest = ({ flowId }) => {
  const reactFlowWrapper = useRef(null);
  const {
    context,
    elements,
    setSelectedElementId,
    publishedData,
    isAutomationTestInProgress,
    testFlowInstance,
    currentTestStepId,
    examplesRequired,
    isUserDecisionRequired,
    isOpenTestExamplesModal,
    setIsOpenTestExamplesModal,
    onValidate,
    firstStepId,
    isDataReady,
    onTestExampleConfirm,
  } = useFlowTest({ flowId });

  const { reactFlowElements } = useFlowElements({
    elements,
    isAutomationTestInProgress,
    isUserDecisionRequired,
    testFlowInstance,
    currentTestStepId,
    firstStepId,
  });

  const handleClick = useCallback(
    (_, element) => {
      setSelectedElementId(element.id);
    },
    [setSelectedElementId]
  );

  if (!elements) {
    return (
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        bgcolor="#f5f6f7"
      >
        {isDataReady ? <CircularProgress /> : <FlowEmptyState />}
      </Box>
    );
  }

  return (
    <Box width="100%" height="100%" bgcolor="#f5f6f7">
      <FlowEditorContextProvider value={context}>
        <ReactFlowProvider>
          <CanvasContainer ref={reactFlowWrapper}>
            <FlowHeader flowId={flowId} publishedData={publishedData} onValidate={onValidate} isTestMode />
            {!isDataReady && (
              <Box position="absolute" left="50%" top="45%">
                <CircularLoader />
              </Box>
            )}
            <ReactFlow
              elements={reactFlowElements}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              nodesDraggable={false}
              nodesConnectable={false}
              minZoom={0.5}
              maxZoom={2}
              onElementClick={handleClick}
            />
            <TestExamplesModal
              isOpen={examplesRequired && isOpenTestExamplesModal}
              onClose={() => setIsOpenTestExamplesModal(false)}
              onConfirm={onTestExampleConfirm}
            />
          </CanvasContainer>
        </ReactFlowProvider>
        {isAutomationTestInProgress && <FlowTestDetailsDrawer />}
      </FlowEditorContextProvider>
    </Box>
  );
};

AutomationTest.propTypes = {
  flowId: string.isRequired,
};

export { AutomationTest };
