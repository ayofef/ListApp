import ReactFlow, { ReactFlowProvider } from 'react-flow-renderer';
import React, { useRef } from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { string } from 'prop-types';
import { nodeTypes } from '../FlowEditor/utils/nodeTypes';
import { edgeTypes } from '../FlowEditor/utils/edgeTypes';
import { FlowEditorContextProvider } from '../FlowEditor/context';
import { CanvasContainer } from '../FlowEditor/styled';
import { FlowHeader } from '../FlowHeader';
import { CircularLoader } from '../atoms';
import { useFlowMonitor } from './hooks/useFlowMonitor';
import FlowMonitorDetailsDrawer from './FlowMonitorDetailsDrawer';
import FlowEmptyState from '../FlowEmptyState/FlowEmptyState';

const FlowMonitor = ({ flowId }) => {
  const reactFlowWrapper = useRef(null);
  const {
    context,
    elements,
    setSelectedElementId,
    onValidate,
    isDataReady,
    reactFlowElements,
    isOpenFlowMonitorDetails,
  } = useFlowMonitor({
    flowId,
  });

  const handleClick = (_, element) => {
    setSelectedElementId(element.id);
  };

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
      <FlowEditorContextProvider value={{ ...context, flowId }}>
        <ReactFlowProvider>
          <CanvasContainer ref={reactFlowWrapper}>
            <FlowHeader onValidate={onValidate} />
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
          </CanvasContainer>
        </ReactFlowProvider>
        {isOpenFlowMonitorDetails && <FlowMonitorDetailsDrawer />}
      </FlowEditorContextProvider>
    </Box>
  );
};

FlowMonitor.propTypes = {
  flowId: string.isRequired,
};

export { FlowMonitor };
