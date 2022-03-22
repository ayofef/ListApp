import pick from 'lodash/pick';
import { DATA_KEYS, GT, LT, SEARCH_KEYS, SELECT_VERBS, FIELD_MAP } from './constants';
import { containsBuilder, valueBuilder, transformBuilder, dateRangeBuilder } from './builders';
import { AND_SEARCH_KEY } from '../../hooks/useGetOptions';

const toUpperCase = (v) => v?.toUpperCase();
/**
 *  here we switch __AND__ with "&" before passing it to the server
 * check src/hooks/useGetOptions.js -> line 40
 *  */
const reservedAndKeywordRegex = new RegExp(AND_SEARCH_KEY, 'g');
const replaceReservedAndKeyword = (value) => value.replace(reservedAndKeywordRegex, '&');

const dateValueBuilders = {
  [SELECT_VERBS.between]: (value) => ({
    [FIELD_MAP[LT]]: value[LT],
    [FIELD_MAP[GT]]: value[GT],
  }),
  [SELECT_VERBS.less]: (value) => ({ [FIELD_MAP[GT]]: value[LT] }),
  [SELECT_VERBS.greater]: (value) => ({ [FIELD_MAP[GT]]: value[GT] }),
};

const amountValueBuilders = {
  [SELECT_VERBS.between]: (value) => ({
    [FIELD_MAP[LT]]: 100 * value[LT],
    [FIELD_MAP[GT]]: 100 * value[GT],
  }),
  [SELECT_VERBS.less]: (value) => ({ [FIELD_MAP[GT]]: 100 * value[LT] }),
  [SELECT_VERBS.greater]: (value) => ({ [FIELD_MAP[GT]]: 100 * value[GT] }),
};

const TRANSFORM = {
  [SEARCH_KEYS.amount]: valueBuilder({ key: DATA_KEYS.amount, valueBuilders: amountValueBuilders }),
  [SEARCH_KEYS.date]: valueBuilder({ key: DATA_KEYS.date, valueBuilders: dateValueBuilders }),
  [SEARCH_KEYS.dateRange]: dateRangeBuilder({ key: DATA_KEYS.dateRange }),
  [SEARCH_KEYS.country]: containsBuilder(DATA_KEYS.country),
  [SEARCH_KEYS.currency]: containsBuilder(DATA_KEYS.currency, toUpperCase),
  [SEARCH_KEYS.issueStatus]: containsBuilder(DATA_KEYS.issueStatus, toUpperCase),
  [SEARCH_KEYS.issueType]: containsBuilder(DATA_KEYS.issueType, toUpperCase),
  [SEARCH_KEYS.issuePriority]: containsBuilder(DATA_KEYS.issuePriority, toUpperCase),
  [SEARCH_KEYS.paymentMethod]: containsBuilder(DATA_KEYS.method, toUpperCase),
  [SEARCH_KEYS.paymentStatus]: containsBuilder(DATA_KEYS.status, toUpperCase),
  [SEARCH_KEYS.intentStatus]: containsBuilder(DATA_KEYS.status, toUpperCase),
  [SEARCH_KEYS.paymentType]: containsBuilder(DATA_KEYS.type, toUpperCase),
  [SEARCH_KEYS.processor]: containsBuilder(DATA_KEYS.gateway),
  [SEARCH_KEYS.flowId]: containsBuilder(DATA_KEYS.flowId),
  [SEARCH_KEYS.category]: containsBuilder(DATA_KEYS.category, replaceReservedAndKeyword),
};

const getTransformSearchParamsToFilter = (fields) => transformBuilder(pick(TRANSFORM, fields));

export { getTransformSearchParamsToFilter };
