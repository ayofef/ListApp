import { GT, LT, SELECT_VERBS } from './constants';

const getSelectedVerb = (value) => {
  const hasLT = value[LT] !== undefined;
  const hasGT = value[GT] !== undefined;

  if (hasLT && hasGT) return SELECT_VERBS.between;

  if (hasLT) return SELECT_VERBS.less;

  if (hasGT) return SELECT_VERBS.greater;

  return null;
};

const containsBuilder = (key, fn) => (value) => ({
  [key]: {
    value: fn?.call ? value.map(fn) : value,
    selectedVerb: SELECT_VERBS.contains,
  },
});

const valueBuilder = ({ key, valueBuilders }) => (value) => {
  const selectedVerb = getSelectedVerb(value);
  if (!selectedVerb) return {};

  return {
    [key]: {
      selectedVerb,
      value: valueBuilders[selectedVerb]?.(value) || {},
    },
  };
};

const dateBuilder = ({ key, fieldMap }) => (value) => ({
  [key]: {
    selectedVerb: getSelectedVerb(value),
    value: { [fieldMap[LT]]: value[LT], [fieldMap[GT]]: value[GT] },
  },
});

const dateRangeBuilder = ({ key }) => (value) => {
  return {
    [key]: {
      selectedVerb: value?.toUpperCase(),
      value: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  };
};

/**
 * @param {Object.<string, function>} TRANSFORM
 * */
const transformBuilder = (TRANSFORM) => (searchParams) => {
  return Object.entries(searchParams).reduce((acc, [key, value]) => {
    const transform = TRANSFORM[key];

    if (!transform) return acc;

    return { ...acc, ...transform(value) };
  }, {});
};

export { valueBuilder, containsBuilder, dateBuilder, transformBuilder, dateRangeBuilder };
