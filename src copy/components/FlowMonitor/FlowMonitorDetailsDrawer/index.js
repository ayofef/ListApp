import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Drawer from '../../Drawer';
import { DetailDrawer } from '../../DetailDrawer';
import LogsModal from '../LogsModal';
import { useFlowEditorContext } from '../../FlowEditor/context';
import NodeLikeHeader from './NodeLikeHeader';
import FlowMonitorDetails from './FlowMonitorDetails';
import FlowMonitorInstanceDetailsDrawer from '../FlowMonitorInstanceDetailsDrawer';

const MODAL_MIN_WIDTH = 440;

const FlowMonitorDetailsDrawer = () => {
  const { t } = useTranslation();
  const { selectedElementData, pageInfo, selectedInstanceId } = useFlowEditorContext();
  const isInstanceStepsScreen = !!selectedInstanceId && !selectedElementData;
  const isLogsScreen = !!selectedInstanceId && !!selectedElementData;
  const Content = useMemo(() => {
    if (isLogsScreen) {
      return LogsModal;
    }
    if (isInstanceStepsScreen) {
      return FlowMonitorInstanceDetailsDrawer;
    }
    return FlowMonitorDetails;
  }, [isInstanceStepsScreen, isLogsScreen]);

  return (
    <Drawer
      open={true}
      position="absolute"
      right="24px"
      bottom="24px"
      top="24px"
      height="100vh"
      borderRadius="8px"
      boxShadow="0px 0px 8px rgba(0, 0, 0, 0.05)"
      pr="0"
      blockWidth={MODAL_MIN_WIDTH}
      fixed
    >
      <DetailDrawer
        open={true}
        title={`${pageInfo.totalSize || 0} ${t('Runs')}`}
        header={
          (isInstanceStepsScreen || isLogsScreen) && (
            <NodeLikeHeader isInstanceStepsScreen={isInstanceStepsScreen} isLogsScreen={isLogsScreen} />
          )
        }
        content={<Content />}
        m={selectedElementData ? '0' : '16px 0 0 0'}
        hideClose
      />
    </Drawer>
  );
};

export default FlowMonitorDetailsDrawer;
