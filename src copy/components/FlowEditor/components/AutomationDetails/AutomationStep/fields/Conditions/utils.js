import { initialLogicalOperator } from '../constants';

const createNewConditions = (arr) => (arr.length > 0 ? arr : null);

const createLogicOperator = (logicalOperator) => logicalOperator || initialLogicalOperator;

export { createNewConditions, createLogicOperator };
