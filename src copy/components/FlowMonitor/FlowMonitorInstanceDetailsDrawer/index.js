import React from 'react';
import Box from '@material-ui/core/Box';
import { StyledDetailsBox } from '../styled';
import { useFlowEditorContext } from '../../FlowEditor/context';
import FlowMonitorDetailsItem from '../FlowMonitorDetailsDrawer/FlowMonitorDetailsItem';
import NodeIcon from '../../FlowEditor/components/NodeLibrary/NodeIcon';
import { FLOW_MONITOR_DETAILS_ITEM_CONTEXT } from '../constant';

const FlowMonitorInstanceDetailsDrawer = () => {
  const { selectedFlowInstance, setSelectedElementId } = useFlowEditorContext();
  if (!selectedFlowInstance) {
    return null;
  }
  return (
    <StyledDetailsBox>
      <Box p="6px 24px">
        {selectedFlowInstance.steps.map((nodeData) => {
          const hasError = selectedFlowInstance.stepWithErrorId === nodeData.id;
          return (
            <FlowMonitorDetailsItem
              context={FLOW_MONITOR_DETAILS_ITEM_CONTEXT.instanceDetails}
              key={nodeData.id}
              label={nodeData.name}
              size={52}
              errorMessage={hasError ? selectedFlowInstance.errorMessage : null}
              onClick={() => setSelectedElementId(nodeData.id)}
            >
              <NodeIcon mr="12px" nodeData={nodeData} type={nodeData.group} hasError={hasError} />
            </FlowMonitorDetailsItem>
          );
        })}
      </Box>
    </StyledDetailsBox>
  );
};
export default FlowMonitorInstanceDetailsDrawer;
