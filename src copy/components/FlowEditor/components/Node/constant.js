import { capitalizeFn, sanitizeSubLabelFn } from '../../utils/nodeSelectedDetails';

const NODE_DETAILS = {
  Conditions: {
    label: 'Check for',
    propertyName: 'conditionProperty',
    transformFn: capitalizeFn,
  },
  Actions: {
    label: 'Action',
    propertyName: 'subLabel',
    transformFn: sanitizeSubLabelFn,
  },
  Triggers: {
    label: 'Trigger',
    propertyName: 'subLabel',
    transformFn: capitalizeFn,
  },

  default: {
    label: 'Action',
    propertyName: 'subLabel',
    transformFn: capitalizeFn,
  },
};

export { NODE_DETAILS };
