import { useFlowEditorContext } from '../../FlowEditor/context';

export const useLogsData = () => {
  const { selectedFlowInstance, selectedElementId } = useFlowEditorContext();

  const logs = selectedFlowInstance?.logs?.filter((el) => el.stepId === selectedElementId);

  const selectedItemLogs = selectedFlowInstance?.stepLogs?.find((el) => el.stepId === selectedElementId);

  return { logs, input: selectedItemLogs?.input, output: selectedItemLogs?.output, selectedItemLogs };
};
