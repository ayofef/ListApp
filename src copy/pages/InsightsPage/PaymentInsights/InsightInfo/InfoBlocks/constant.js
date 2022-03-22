import capitalize from '@material-ui/core/utils/capitalize';
import isEmpty from 'lodash/isEmpty';
import { COUNTRY_MAP } from '../../../../../constants/COUNTRY_ISO3';
import { UI_ROUTES } from '../../../../../constants/routes';

const ICON_MAP = {
  Countries: (countryCode) =>
    countryCode === 'Intl'
      ? 'https://media.graphcms.com/ST1oY1YaR7ysNZf9Kjqn'
      : `${UI_ROUTES.countriesIcons}/${COUNTRY_MAP[countryCode] ?? countryCode}.svg`,
};

// , is intentionally ommited
const SYMBOL_REGEX = /[!@#$%^&*()_+\-=[\]{};':"\\|.<>/?]+/;

const LABEL_MAP = {
  jpmorgan: 'J.P. Morgan',
};

const parseLabel = (objKey) => {
  const lowercase = objKey?.toLowerCase();
  const multipleWords = objKey?.split(' ')?.length > 1;

  if (multipleWords && lowercase?.includes('of')) {
    return lowercase
      ?.split('of')
      ?.map((el) => capitalize(el.trim()))
      ?.join(' of ');
  }

  return lowercase
    ?.split(' ')
    ?.map((el) => {
      if (SYMBOL_REGEX.test(el)) {
        return el.toUpperCase();
      }
      if (LABEL_MAP[el]) {
        return LABEL_MAP[el];
      }
      return capitalize(el);
    })
    ?.join(' ');
};

const FEES_KEYS_MAP = {
  totalFees: 'Total paid fees',
  averageFees: 'Average cost per payment',
};

const transformTotalFeesData = (data) =>
  isEmpty(data)
    ? []
    : [
        { [FEES_KEYS_MAP.totalFees]: { amount: data?.total } },
        { [FEES_KEYS_MAP.averageFees]: { amount: data?.average } },
      ];

const getObjKey = (item = {}) => Object.keys(item)?.[0] || '';

const OTHERS_KEY = 'Others';

const customSortBy = (data, sortKey) =>
  data?.sort((first) => (getObjKey(first)?.toLowerCase() === sortKey?.toLowerCase() ? 0 : -1));

export {
  SYMBOL_REGEX,
  ICON_MAP,
  parseLabel,
  transformTotalFeesData,
  getObjKey,
  OTHERS_KEY,
  FEES_KEYS_MAP,
  customSortBy,
};
