import { checkCardBrand } from '../../../../../utils/checkCardBrand';

const CARD_MAX_LENGTH_MAP = {
  DEFAULT: 19, //3
  VISA: 23, //4
  AMERICAN: 18, //3
  MAESTRO: 23, //4
};

const COMMON_MAX = 3;

const CVC_MAX_LENGTH_MAP = {
  DEFAULT: 4,
  VISA: COMMON_MAX,
  MAESTRO: COMMON_MAX,
  MASTERCARD: COMMON_MAX,
  DISCOVER: COMMON_MAX,
  DINERS: COMMON_MAX,
  UNIONPAY: COMMON_MAX,
  JCB: COMMON_MAX,
};

const normalizeCardNumber = (value, cardDomain) =>
  value
    .replace(/\s/g, '')
    .replace(
      /\D/g,
      '' // To allow only digits
    )
    .match(/.{1,4}/g)
    ?.join(' ')
    .substr(0, CARD_MAX_LENGTH_MAP[cardDomain] ?? CARD_MAX_LENGTH_MAP.DEFAULT) || '';

const normalizeCvc = (value, { cardNumber }) => {
  const cardBrand = checkCardBrand(cardNumber);
  const max = CVC_MAX_LENGTH_MAP[cardBrand] ?? CVC_MAX_LENGTH_MAP.DEFAULT;

  return value
    .replace(
      /\D/g,
      '' // To allow only digits
    )
    .substring(0, max);
};

const normalizeExpired = (value) =>
  value
    .replace(
      /^([1-9]\/|[2-9])$/g,
      '0$1/' // 3 > 03/
    )
    .replace(
      /^(0[1-9]|1[0-2])$/g,
      '$1/' // 11 > 11/
    )
    .replace(
      /^([0-1])([3-9])$/g,
      '0$1/$2' // 13 > 01/3
    )
    .replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
      '$1/$2' // 141 > 01/41
    )
    .replace(
      /^([0]+)\/|[0]+$/g,
      '0' // 0/ > 0 and 00 > 0
    )
    .replace(
      /[^\d/]|^[/]*$/g,
      '' // To allow only digits and `/`
    )
    .replace(
      /\/\//g,
      '/' // Prevent entering more than 1 `/`
    )
    .substring(0, 7);

export { normalizeCardNumber, normalizeExpired, normalizeCvc };
