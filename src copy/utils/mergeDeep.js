import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';

const mergeDeep = (target, source) => merge(cloneDeep(target), source);

export { mergeDeep };
