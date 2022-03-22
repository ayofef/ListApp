export const FLOW_INSTANCE_STATUSES = {
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  DEAD: 'DEAD',
  IN_ERROR: 'IN_ERROR',
};

export const FLOW_INSTANCES_STATUS_MAP = {
  [FLOW_INSTANCE_STATUSES.IN_PROGRESS]: { title: 'In progress', color: '#000' },
  [FLOW_INSTANCE_STATUSES.COMPLETED]: { title: 'Success', color: '#14B95C' },
  [FLOW_INSTANCE_STATUSES.IN_ERROR]: { title: 'Error', color: '#B74242' },
};
export const FLOW_MONITOR_DETAILS_ITEM_CONTEXT = {
  instanceList: 'instanceList',
  instanceDetails: 'instanceDetails',
};
