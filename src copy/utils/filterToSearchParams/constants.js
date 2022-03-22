const LT = 'lt';
const GT = 'gt';
const BT = 'bt';

const SEARCH_KEYS = {
  dateRange: 'dateRange',
  date: 'date',
  amount: 'amount',
  currency: 'currency',
  processor: 'gateway',
  paymentMethod: 'paymentMethod',
  paymentType: 'paymentType',
  paymentStatus: 'paymentStatus',
  country: 'country',
  issueStatus: 'issueStatus',
  intentStatus: 'intentStatus',
  issueType: 'issueType',
  issuePriority: 'issuePriority',
  flowId: 'flowId',
  category: 'category',
};

const DATA_KEYS = {
  dateRange: 'dateRange',
  date: 'date',
  amount: 'amount',
  currency: 'currency',
  status: 'status',
  method: 'method',
  gateway: 'gateway',
  type: 'type',
  country: 'country',
  issueStatus: 'status',
  intentStatus: 'status',
  issueType: 'type',
  issuePriority: 'priority',
  flowId: 'flowId',
  category: 'category',
};

const SELECT_VERBS = {
  between: 'IS_BETWEEN',
  less: 'IS_LESS_THAN',
  greater: 'IS_GREATER_THAN',
  equal: 'IS_EQUAL',
  contains: 'CONTAINS',
};

const FIELD_MAP = { [GT]: 'min', [LT]: 'max' };

export { LT, GT, BT, SEARCH_KEYS, DATA_KEYS, FIELD_MAP, SELECT_VERBS };
