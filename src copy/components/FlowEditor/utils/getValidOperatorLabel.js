import isEmpty from 'lodash/isEmpty';

const VALID_OPERATORS_LABEL_MAP = {
  EQUALS: '=',
  NOT_EQUALS: '≠',
  LESS_THAN: '<',
  LESS_THAN_EQUALS: '≤',
  GREATER_THAN: '>',
  GREATER_THAN_EQUALS: '≥',
  CONTAINS: 'contains',
  IS_EMPTY: 'is empty',
  NOT_EMPTY: 'is not empty',
  ALL: 'all',
  OTHER: 'other',
};

export const getValidOperatorLabel = (operator) =>
  isEmpty(operator) ? 'N/A' : VALID_OPERATORS_LABEL_MAP[operator] ?? operator?.replace(/_/g, ' ')?.toLowerCase();
