import moment from 'moment';

const DATEPICKER_VARIANTS = {
  monitor: 'monitor',
  insights: 'insights',
};

const RANGE_TYPE_DICTIONARY = {
  between: 'between',
  after: 'after',
  before: 'before',
};

const RANGE_TYPE_LABEL_MAP = {
  [RANGE_TYPE_DICTIONARY.between]: 'between',
  [RANGE_TYPE_DICTIONARY.after]: 'after',
  [RANGE_TYPE_DICTIONARY.before]: 'before',
};

const RANGE_DICTIONARY = {
  today: 'today',
  yesterday: 'yesterday',
  thisWeek: 'thisWeek',
  sevenDays: 'sevenDays',
  thisMonth: 'thisMonth',
  lastMonth: 'lastMonth',
  thisYear: 'thisYear',
  allTime: 'allTime',
  custom: 'custom',
};

const RANGE_LABEL_MAP = {
  [RANGE_DICTIONARY.today]: 'Today',
  [RANGE_DICTIONARY.yesterday]: 'Yesterday',
  [RANGE_DICTIONARY.thisWeek]: 'This week',
  [RANGE_DICTIONARY.sevenDays]: 'Last 7 days',
  [RANGE_DICTIONARY.thisMonth]: 'This month',
  [RANGE_DICTIONARY.lastMonth]: 'Last month',
  [RANGE_DICTIONARY.thisYear]: 'This year',
  [RANGE_DICTIONARY.allTime]: 'All time',
  custom: 'custom',
};

const rangeOptions = [
  {
    value: RANGE_DICTIONARY.today,
    text: {
      text: RANGE_LABEL_MAP[RANGE_DICTIONARY.today],
    },
  },
  {
    value: RANGE_DICTIONARY.yesterday,
    text: {
      text: RANGE_LABEL_MAP[RANGE_DICTIONARY.yesterday],
    },
  },
  {
    value: RANGE_DICTIONARY.thisWeek,
    text: {
      text: RANGE_LABEL_MAP[RANGE_DICTIONARY.thisWeek],
    },
  },
  {
    value: RANGE_DICTIONARY.sevenDays,
    text: {
      text: RANGE_LABEL_MAP[RANGE_DICTIONARY.sevenDays],
    },
  },
  {
    value: RANGE_DICTIONARY.thisMonth,
    text: {
      text: RANGE_LABEL_MAP[RANGE_DICTIONARY.thisMonth],
    },
  },
  {
    value: RANGE_DICTIONARY.lastMonth,
    text: {
      text: RANGE_LABEL_MAP[RANGE_DICTIONARY.lastMonth],
    },
  },
  {
    value: RANGE_DICTIONARY.thisYear,
    text: {
      text: RANGE_LABEL_MAP[RANGE_DICTIONARY.thisYear],
    },
  },
];

const monitorRangeOptions = [
  ...rangeOptions,
  {
    value: RANGE_DICTIONARY.allTime,
    text: {
      text: RANGE_LABEL_MAP[RANGE_DICTIONARY.allTime],
    },
  },
];

/**
 * Max date is today - endOfDay - reference - transformDateValues
 * prevents adding future dates
 */

const RANGE_MAP = {
  [RANGE_DICTIONARY.today]: () => ({
    startDate: moment()
      .startOf('day')
      .toDate(),
    endDate: moment().toDate(),
  }),
  [RANGE_DICTIONARY.yesterday]: () => ({
    startDate: moment()
      .subtract(1, 'days')
      .startOf('day')
      .toDate(),
    endDate: moment()
      .subtract(1, 'days')
      .endOf('day')
      .toDate(),
  }),
  [RANGE_DICTIONARY.sevenDays]: () => ({
    startDate: moment()
      .subtract(6, 'days')
      .startOf('day')
      .toDate(), // 6 because it  includes today
    endDate: moment().toDate(),
  }),
  [RANGE_DICTIONARY.thisWeek]: () => ({
    startDate: moment()
      .startOf('week')
      .toDate(),
    endDate: moment().toDate(),
  }),
  [RANGE_DICTIONARY.thisMonth]: () => ({
    startDate: moment()
      .startOf('month')
      .toDate(),
    endDate: moment().toDate(),
  }),
  [RANGE_DICTIONARY.lastMonth]: () => ({
    startDate: moment()
      .subtract(1, 'month')
      .startOf('month')
      .toDate(),
    endDate: moment()
      .subtract(1, 'month')
      .endOf('month')
      .toDate(),
  }),
  [RANGE_DICTIONARY.thisYear]: () => ({
    startDate: moment()
      .startOf('year')
      .toDate(),
    endDate: moment().toDate(),
  }),
  [RANGE_DICTIONARY.allTime]: () => null,
};

const getDateRange = (range) => {
  switch (range) {
    case RANGE_DICTIONARY.today:
      return RANGE_MAP[RANGE_DICTIONARY.today]();

    case RANGE_DICTIONARY.yesterday:
      return RANGE_MAP[RANGE_DICTIONARY.yesterday]();

    case RANGE_DICTIONARY.sevenDays:
      return RANGE_MAP[RANGE_DICTIONARY.sevenDays]();

    case RANGE_DICTIONARY.thisWeek:
      return RANGE_MAP[RANGE_DICTIONARY.thisWeek]();

    case RANGE_DICTIONARY.thisMonth:
      return RANGE_MAP[RANGE_DICTIONARY.thisMonth]();

    case RANGE_DICTIONARY.lastMonth:
      return RANGE_MAP[RANGE_DICTIONARY.lastMonth]();

    case RANGE_DICTIONARY.thisYear:
      return RANGE_MAP[RANGE_DICTIONARY.thisYear]();

    case RANGE_DICTIONARY.allTime:
      return RANGE_MAP[RANGE_DICTIONARY.allTime]();

    default:
      return {
        startDate: moment().toDate(),
        endDate: moment().toDate(),
      };
  }
};

const getIntervalLabel = (range) => {
  const startDate = new Date(range?.gt);
  const endDate = new Date(range?.lt);

  const label = Object.keys(RANGE_MAP).find(
    (el) =>
      moment(startDate).isSame(RANGE_MAP[el]?.()?.startDate, 'day') &&
      moment(endDate).isSame(RANGE_MAP[el]?.()?.endDate, 'day')
  );

  return label ?? RANGE_DICTIONARY.custom;
};

const chartUpdateOptions = [
  {
    value: 'total.rawAmount',
    text: {
      text: 'Total value',
    },
  },
  {
    value: 'count',
    text: {
      text: 'Total count',
    },
  },
];

const transformDateValues = (range) => {
  const gtStartOfYear = moment(range?.startDate)
    .startOf('year')
    .toISOString();

  //start date - start of the Day
  const gt = moment(range?.startDate)
    .startOf('day')
    .toISOString();

  //end date - end of the day
  const lt = moment(range?.endDate)
    .endOf('day')
    .toISOString();

  //today - end of the day
  const today = moment()
    .endOf('day')
    .toISOString();

  return { gt, lt, gtStartOfYear, today };
};

const getBeforeDate = (date) => {
  return moment(date)
    .startOf('day')
    .toISOString();
};

const getAfterDate = (date) => {
  return moment(date)
    .endOf('day')
    .toISOString();
};

export {
  getDateRange,
  getIntervalLabel,
  rangeOptions,
  monitorRangeOptions,
  chartUpdateOptions,
  RANGE_DICTIONARY,
  RANGE_MAP,
  RANGE_LABEL_MAP,
  RANGE_TYPE_DICTIONARY,
  RANGE_TYPE_LABEL_MAP,
  transformDateValues,
  DATEPICKER_VARIANTS,
  getBeforeDate,
  getAfterDate,
};
