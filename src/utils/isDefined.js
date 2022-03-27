import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

export const isDefined = (value) => !isNull(value) && !isUndefined(value);
