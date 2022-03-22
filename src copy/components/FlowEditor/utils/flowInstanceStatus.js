export const FLOW_INSTANCE_STATUSES = {
  IN_PROGRESS: 'IN_PROGRESS',
  IN_ERROR: 'IN_ERROR',
  COMPLETED: 'COMPLETED',
  ALL: 'ALL',
};

export const ALL_FLOW_INSTANCE_STATUSES = ['IN_PROGRESS', 'IN_ERROR', 'COMPLETED'];

export const FLOW_INSTANCES_STATUS_MAP = {
  [FLOW_INSTANCE_STATUSES.IN_PROGRESS]: { title: 'In progress', color: '#000' },
  [FLOW_INSTANCE_STATUSES.COMPLETED]: { title: 'Success', color: '#14B95C' },
  [FLOW_INSTANCE_STATUSES.IN_ERROR]: { title: 'Error', color: '#B74242' },
};

const isFlowInstanceInProgress = (flowInstance) => flowInstance?.status === FLOW_INSTANCE_STATUSES.IN_PROGRESS;
const isFlowInstanceInError = (flowInstance) => flowInstance?.status === FLOW_INSTANCE_STATUSES.IN_ERROR;
const isFlowInstanceCompleted = (flowInstance) => flowInstance?.status === FLOW_INSTANCE_STATUSES.COMPLETED;

export { isFlowInstanceInProgress, isFlowInstanceInError, isFlowInstanceCompleted };
