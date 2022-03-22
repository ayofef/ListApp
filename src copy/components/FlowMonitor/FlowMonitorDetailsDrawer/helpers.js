import moment from 'moment';
import { FLOW_INSTANCE_STATUSES, isFlowInstanceInError } from '../../FlowEditor/utils/flowInstanceStatus';

export const ROWS_PER_PAGE = 20;

export const prepareFlowInstances = (instances) => {
  return instances?.map((instance) => {
    const [error] = instance.logs?.filter((log) => log.level === 'ERROR');
    const stepWithError = error ? instance.steps.find((step) => step.id === error.stepId) : null;
    const steps = error
      ? instance.steps.map((item) => {
          if (item.id === error.stepId) {
            return {
              ...item,
              isValid: false,
            };
          }
          return item;
        })
      : instance.steps;

    return {
      ...instance,
      date: moment(instance?.created).format('L LTS'),
      isInErrorStatus: isFlowInstanceInError(instance),
      errorMessage: error?.message,
      stepWithErrorName: stepWithError?.name || null,
      stepWithErrorId: stepWithError?.id || null,
      steps,
    };
  });
};

export const isStatusOptions = [
  {
    value: FLOW_INSTANCE_STATUSES.ALL,
    text: {
      text: 'All statuses',
    },
  },
  {
    value: FLOW_INSTANCE_STATUSES.COMPLETED,
    text: {
      text: 'Completed',
    },
  },
  {
    value: FLOW_INSTANCE_STATUSES.IN_PROGRESS,
    text: {
      text: 'In progress',
    },
  },
  {
    value: FLOW_INSTANCE_STATUSES.IN_ERROR,
    text: {
      text: 'In error',
    },
  },
];
