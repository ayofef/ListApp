import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import { capitalize } from '@material-ui/core';
import { GT, LT, DATA_KEYS, SEARCH_KEYS, SELECT_VERBS, FIELD_MAP } from './constants';

/* TODO: remove isEqualBuilder if database hasn't records with 'IS_EQUAL' */
const isEqualBuilder = (key) => (value) => ({ [key]: [value.toLowerCase()] });
const containsBuilder = (key, textTransform) => (value) => ({
  [key]: value.map((v) => (textTransform ? capitalize(v) : v.toLowerCase())),
});
const isLessBuilder = (key, fieldMap, fn) => (value) => {
  const lt = value[fieldMap[GT]];

  return { [key]: { [LT]: fn?.call ? fn(lt) : lt } };
};
const isGreaterBuilder = (key, fieldMap, fn) => (value) => {
  const gt = value[fieldMap[GT]];

  return { [key]: { [GT]: fn?.call ? fn(gt) : gt } };
};
const isBetweenBuilder = (key, fieldMap, fn) => (value) => {
  const lt = value[fieldMap[LT]];
  const gt = value[fieldMap[GT]];

  return {
    [key]: pickBy(
      {
        [LT]: fn?.call ? fn(lt) : lt,
        [GT]: fn?.call ? fn(gt) : gt,
      },
      identity
    ),
  };
};

const amountFn = (v) => 0.01 * v;

const TRANSFORM = {
  [DATA_KEYS.date]: {
    [SELECT_VERBS.between]: isBetweenBuilder(SEARCH_KEYS.date, FIELD_MAP),
    [SELECT_VERBS.less]: isLessBuilder(SEARCH_KEYS.date, FIELD_MAP),
    [SELECT_VERBS.greater]: isGreaterBuilder(SEARCH_KEYS.date, FIELD_MAP),
  },
  [DATA_KEYS.amount]: {
    [SELECT_VERBS.between]: isBetweenBuilder(SEARCH_KEYS.amount, FIELD_MAP, amountFn),
    [SELECT_VERBS.less]: isLessBuilder(SEARCH_KEYS.amount, FIELD_MAP, amountFn),
    [SELECT_VERBS.greater]: isGreaterBuilder(SEARCH_KEYS.amount, FIELD_MAP, amountFn),
  },
  [DATA_KEYS.currency]: {
    [SELECT_VERBS.equal]: isEqualBuilder(SEARCH_KEYS.currency),
    [SELECT_VERBS.contains]: containsBuilder(SEARCH_KEYS.currency),
  },
  [DATA_KEYS.status]: {
    [SELECT_VERBS.equal]: isEqualBuilder(SEARCH_KEYS.paymentStatus),
    [SELECT_VERBS.contains]: containsBuilder(SEARCH_KEYS.paymentStatus),
  },
  [DATA_KEYS.method]: {
    [SELECT_VERBS.equal]: isEqualBuilder(SEARCH_KEYS.paymentMethod),
    [SELECT_VERBS.contains]: containsBuilder(SEARCH_KEYS.paymentMethod),
  },
  [DATA_KEYS.gateway]: {
    [SELECT_VERBS.equal]: isEqualBuilder(SEARCH_KEYS.processor),
    [SELECT_VERBS.contains]: containsBuilder(SEARCH_KEYS.processor, true),
  },
  [DATA_KEYS.type]: {
    [SELECT_VERBS.equal]: isEqualBuilder(SEARCH_KEYS.paymentType),
    [SELECT_VERBS.contains]: containsBuilder(SEARCH_KEYS.paymentType),
  },
  [DATA_KEYS.country]: {
    [SELECT_VERBS.equal]: isEqualBuilder(SEARCH_KEYS.country),
    [SELECT_VERBS.contains]: containsBuilder(SEARCH_KEYS.country, true),
  },
};

const transformFilterToSearchParams = (data) =>
  data &&
  Object.entries(data).reduce((acc, [key, valueData]) => {
    const selectedVerb = valueData?.selectedVerb;
    const value = valueData?.value;
    const transform = TRANSFORM[key]?.[selectedVerb];

    if (!transform && key !== DATA_KEYS.dateRange) return acc;

    if (key === DATA_KEYS.dateRange) {
      if (!selectedVerb) {
        return acc;
      }
      return { ...acc, ...{ [DATA_KEYS.dateRange]: selectedVerb?.toLowerCase() } };
    }

    return { ...acc, ...transform(value) };
  }, {});

export { transformFilterToSearchParams };
