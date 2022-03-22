import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

const MAX_SHOW_TIME_INTERVAL_MINUTES = 1439; //23.59hrs
const DISPLAY_DATE_AND_TIME_KEY = 'end';

const generateDate = (add, number) => {
  const date = new Date();
  if (add) {
    date.setDate(date.getDate() + number);
  } else {
    date.setDate(date.getDate() - number);
  }
  return date;
};
const skeletonArray = Array.from(Array(8).keys());
const format = (date) => moment(date).format('D MMM');

const MOCK_CHART_DATA = [
  {
    date: format(generateDate(false, 6)),
    total: {
      rawAmount: 0,
      secondRawAmount: 0,
    },
  },
  {
    date: format(generateDate(false, 5)),
    total: {
      rawAmount: 200,
      secondRawAmount: 300,
    },
  },
  {
    date: format(generateDate(false, 4)),
    total: {
      rawAmount: 100,
      secondRawAmount: 150,
    },
  },
  {
    date: format(generateDate(false, 3)),
    total: {
      rawAmount: 160,
      secondRawAmount: 50,
    },
  },
  {
    date: format(generateDate(false, 2)),
    total: {
      rawAmount: 210,
      secondRawAmount: 150,
    },
  },
  {
    date: format(generateDate(false, 1)),
    total: {
      rawAmount: 100,
      secondRawAmount: 180,
    },
  },
  {
    date: format(new Date()),
    total: {
      rawAmount: 350,
      secondRawAmount: 300,
    },
  },
  {
    date: format(generateDate(true, 1)),
    total: {
      rawAmount: 250,
      secondRawAmount: 300,
    },
  },
];

const MOCK_BAR_CHART_DATA = () =>
  skeletonArray.map((key) => ({
    uniqueID: `cell-${key}`,
    value: key < skeletonArray.length - 3 ? 900 - key * 100 : 200,
    name: `mock`,
  }));

const DATA_IS_EMPTY = (arr) => {
  const empty = isEmpty(arr);
  const zeroValues = arr?.every((e) => e?.total?.rawAmount === 0);
  return empty || zeroValues;
};

const handleDetailsDateInterval = (dateObject = {}) => {
  const { gt, lt } = dateObject;
  const high = moment(gt || null);
  const low = moment(lt || null);
  const monthDiff = low.diff(high, 'months') + 1;
  const dayDiff = low.diff(high, 'days') + 1;

  switch (true) {
    case monthDiff > 5:
      return {
        interval: 40320, //default is monthly
        momentKey: 'month', // sets intervalTypeMonth to true in query param
        intervalValues: [10080, 1440], //weekly, daily
      };
    case dayDiff > 29:
      return {
        interval: 10080, // default is weekly
        momentKey: 'week',
        intervalValues: [1440, 60], // daily, 60min
      };
    case dayDiff > 4:
      return {
        interval: 1440, // default is 24hr
        momentKey: 'day',
        intervalValues: [60, 30, 15], //60min, 30, 15
      };
    default: {
      return {
        interval: 240, // 4hours is default
        momentKey: 'hour',
        intervalValues: [60, 30, 15], //60min, 30, 15
      };
    }
  }
};

const handleHomepageDateInterval = (dateObject = {}) => {
  const { gt, lt } = dateObject;
  const high = moment(gt || null).startOf('day');
  const low = moment(lt || null).endOf('day');
  const dayDiff = low.diff(high, 'days') + 1;

  /**
   * dayDiff of 20 | 30 | 40 | 50 | 60 are a multiple of 1440
   * 20 =  2 * 1440
   * 30 = 3 * 1440
   */
  if (dayDiff >= 20) {
    const tenth = Math.floor(dayDiff / 10);

    return {
      interval: 1440 * tenth,
      momentKey: '',
    };
  }

  switch (true) {
    case dayDiff > 5:
      return {
        interval: 1440, // default is 24hr
        momentKey: 'day',
      };
    case dayDiff <= 1:
      return {
        interval: 60, // default is 1hr
        momentKey: 'hour',
      };
    case dayDiff <= 3:
      return {
        interval: 180, // default is 3hr
        momentKey: 'hour',
        showDate: true,
      };
    case dayDiff <= 5:
      return {
        interval: 360, // default is 6hr
        momentKey: 'hour',
        showDate: true,
      };
    default: {
      return {
        interval: 60, // default is 1hr
        momentKey: 'hour',
      };
    }
  }
};

const INTERVAL_TEXT_MAP = {
  15: '15 minutes',
  30: '30 minutes',
  60: '60 minutes',
  240: '4 hours',
  360: '6 hours',
  720: '12 hours',
  1440: 'Daily',
  10080: 'Weekly',
  40320: 'Monthly',
  120960: 'quarterly',
};

export {
  MOCK_CHART_DATA,
  DATA_IS_EMPTY,
  MOCK_BAR_CHART_DATA,
  INTERVAL_TEXT_MAP,
  handleDetailsDateInterval,
  handleHomepageDateInterval,
  MAX_SHOW_TIME_INTERVAL_MINUTES,
  DISPLAY_DATE_AND_TIME_KEY,
};
