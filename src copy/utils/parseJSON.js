import { isDefined } from './helpers';

export const parseJSON = (value) => {
  let parsedValue = {};

  if (!isDefined(value)) return parsedValue;
  if (typeof value === 'object') return value;

  try {
    const parsed = JSON.parse(value);
    parsedValue = parsed;
  } catch (e) {
    // if there's an error, value is invalid so return the empty object
    return parsedValue;
  }

  return parsedValue;
};
