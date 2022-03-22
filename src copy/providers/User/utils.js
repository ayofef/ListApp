import pick from 'lodash/pick';

const FIRST_TIME_ENTRY = 'firstTimeEntry';

const pickFields = (value) => pick(value, ['isGreeted']);

export { FIRST_TIME_ENTRY, pickFields };
