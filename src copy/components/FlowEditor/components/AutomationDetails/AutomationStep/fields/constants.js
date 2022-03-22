// enum ComparisonOperator: schema.graphql
const ComparisonOperator = {
  EQUALS: 'EQUALS',
  NOT_EQUALS: 'NOT_EQUALS',
  LESS_THAN: 'LESS_THAN',
  LESS_THAN_EQUALS: 'LESS_THAN_EQUALS',
  GREATER_THAN: 'GREATER_THAN',
  GREATER_THAN_EQUALS: 'GREATER_THAN_EQUALS',
  CONTAINS: 'CONTAINS',
  IS_EMPTY: 'IS_EMPTY',
  NOT_EMPTY: 'NOT_EMPTY',
};
// enum LogicalOperator: schema.graphql
const LogicalOperator = {
  AND: 'AND',
  OR: 'OR',
};

//url validation regex
// eslint-disable-next-line no-useless-escape
const URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

const initialLogicalOperator = LogicalOperator.AND;
const initialComparisonOperator = ComparisonOperator.IS_EMPTY;

export { ComparisonOperator, LogicalOperator, initialLogicalOperator, initialComparisonOperator, URL_REGEX };
