import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { useFlowEditorContext } from '../../FlowEditor/context';
import Drawer from '../../Drawer';
import { DetailDrawer } from '../../DetailDrawer';
import AutomationTestLogs from './AutomationTestLogs';

const FlowTestDetailsDrawer = () => {
  const { t } = useTranslation();
  const { selectedElementData, setSelectedElementId, testFlowInstance } = useFlowEditorContext();
  const onClose = () => setSelectedElementId(null);
  const open = Boolean(selectedElementData);
  const logs = testFlowInstance?.logs?.sort((a, b) => new Date(a?.ts) - new Date(b?.ts));

  return (
    <Drawer
      open={open}
      position="absolute"
      right="24px"
      bottom="24px"
      top="104px"
      height="100vh"
      borderRadius="8px"
      boxShadow="0px 0px 8px rgba(0, 0, 0, 0.05)"
      fixed
    >
      <DetailDrawer
        open={open}
        title={t(selectedElementData?.name)}
        onClose={onClose}
        footer={<Box color="#E6E9EC" />}
        content={<AutomationTestLogs logs={logs} />}
      />
    </Drawer>
  );
};

export { FlowTestDetailsDrawer };
