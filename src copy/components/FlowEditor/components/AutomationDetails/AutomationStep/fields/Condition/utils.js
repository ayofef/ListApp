import { NONE } from '../../../../../../forms/_common/Select';
import { rightOperandShownArray } from './constants';

const createCondition = (prevCondition, key, value) => ({
  ...prevCondition,
  [key]: value,
  ...(key === 'op' && rightOperandShownArray.includes(value) && { right: null }),
  ...(key === 'left' && value === NONE && { [key]: '' }),
});

export { createCondition };
