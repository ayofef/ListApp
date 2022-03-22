import { ComparisonOperator } from '../constants';

const operationOptions = [
  { value: ComparisonOperator.EQUALS, title: 'equals' },
  { value: ComparisonOperator.NOT_EQUALS, title: 'not equals' },
  { value: ComparisonOperator.LESS_THAN, title: 'less than' },
  { value: ComparisonOperator.LESS_THAN_EQUALS, title: 'less than or equals' },
  { value: ComparisonOperator.GREATER_THAN, title: 'greater than' },
  { value: ComparisonOperator.GREATER_THAN_EQUALS, title: 'greater than or equals' },
  { value: ComparisonOperator.CONTAINS, title: 'contains' },
  { value: ComparisonOperator.IS_EMPTY, title: 'is empty' },
  { value: ComparisonOperator.NOT_EMPTY, title: 'not empty' },
];

const rightOperandShownArray = [ComparisonOperator.IS_EMPTY, ComparisonOperator.NOT_EMPTY];
const showDefaultRightOperand = [ComparisonOperator.EQUALS, ComparisonOperator.NOT_EQUALS];

export { operationOptions, rightOperandShownArray, showDefaultRightOperand };
