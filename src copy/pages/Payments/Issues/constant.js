const TYPE_OPTIONS = [
  {
    value: 'CUSTOMER',
    label: 'Customer',
  },
  {
    value: 'ISSUER',
    label: 'Issuer',
  },
];

const PRIORITY_OPTIONS = [
  {
    value: 'HIGH',
    label: 'High',
  },
  {
    value: 'MEDIUM',
    label: 'Medium',
  },
  {
    value: 'LOW',
    label: 'Low',
  },
];

const STATUS_OPTIONS = [
  {
    value: 'OPEN',
    label: 'Open',
  },
  {
    value: 'REFUNDED',
    label: 'Refunded',
  },
  {
    value: 'RESOLVED',
    label: 'Resolved',
  },
  {
    value: 'COMPLETED',
    label: 'Completed',
  },
];

const ISSUES_DETAILS_COLUMN_MAP = {
  issueType: 'type',
  issueDate: 'systemCreated',
  issueAssignee: 'assigneeUser',
  issueCreator: 'userCreator',
  issuePriority: 'priority',
  issueStatus: 'status',
  issuesAssigneeCreator: 'issuesAssigneeCreator', // FE only
};

const ISSUES_DATA_KEYS = [
  ISSUES_DETAILS_COLUMN_MAP.issueType,
  ISSUES_DETAILS_COLUMN_MAP.issueDate,
  ISSUES_DETAILS_COLUMN_MAP.issuesAssigneeCreator,
  ISSUES_DETAILS_COLUMN_MAP.issuePriority,
  ISSUES_DETAILS_COLUMN_MAP.issueStatus,
];
export { STATUS_OPTIONS, PRIORITY_OPTIONS, TYPE_OPTIONS, ISSUES_DATA_KEYS, ISSUES_DETAILS_COLUMN_MAP };
