import moment from 'moment';
import { GT, BT, LT, SEARCH_KEYS } from '../../../../utils/filterToSearchParams/constants';

const SHOW_LEFT = [GT, BT];
const SHOW_RIGHT = [LT, BT];

const isShowLeft = (value) => SHOW_LEFT.includes(value);
const isShowRight = (value) => SHOW_RIGHT.includes(value);
const lazySelected = (value) => {
  const gt = value?.[GT] !== undefined;
  const lt = value?.[LT] !== undefined;

  if (gt && lt) return BT;
  if (gt) return GT;
  if (lt) return LT;

  return GT;
};

//For fields with select
const handleDateInitialValue = (value) => {
  if (value === BT) {
    return {
      [GT]: moment().toISOString(),
      [LT]: moment().toISOString(),
    };
  }
  return {
    [value]: moment().toISOString(),
  };
};

/**
 * NaN here is to prevent triggering the valid state when we pass an empty string instead. Can't use 0 because our validation schema expects value to be a positive number.
 */
const AMOUNT_INITIAL_VALUE = NaN;
const handleAmountInitialValue = (value) => {
  if (value === BT) {
    return {
      [GT]: AMOUNT_INITIAL_VALUE,
      [LT]: AMOUNT_INITIAL_VALUE,
    };
  }
  return {
    [value]: AMOUNT_INITIAL_VALUE,
  };
};

const INITIAL_VALUE_MAP = {
  [SEARCH_KEYS.date]: (value) => handleDateInitialValue(value),
  [SEARCH_KEYS.amount]: (value) => handleAmountInitialValue(value),
  systemCreated: (value) => handleDateInitialValue(value),
};

const getInitialValues = (value, name) => {
  const valueFn = INITIAL_VALUE_MAP[name];
  return valueFn(value);
};

export { lazySelected, isShowLeft, isShowRight, getInitialValues };
