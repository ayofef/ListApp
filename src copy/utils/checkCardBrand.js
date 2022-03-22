const CARD_BRANDS = {
  VISA: 'VISA',
  MASTERCARD: 'MASTERCARD',
  AMEX: 'AMEX',
  DISCOVER: 'DISCOVER',
  DINERS: 'DINERS',
  JCB: 'JCB',
  UNIONPAY: 'UNIONPAY',
  MAESTRO: 'MAESTRO',
  ACCOUNT: 'ACCOUNT',
};

export const checkCardBrand = (value) => {
  switch (true) {
    case RegExp('^4,*').test(value):
      return CARD_BRANDS.VISA;
    case RegExp('^5(1|2|3|4|5),*').test(value):
      return CARD_BRANDS.MASTERCARD;
    case RegExp('^2,*').test(value):
      return CARD_BRANDS.MASTERCARD;
    case RegExp('^3(4|7),*').test(value):
      return CARD_BRANDS.AMEX;
    case RegExp('^6(01|22|44|5),*').test(value):
      return CARD_BRANDS.DISCOVER;
    case RegExp('^3(0|6|8),*').test(value):
      return CARD_BRANDS.DINERS;
    case RegExp('^5(0|6|7|8),*').test(value):
      return CARD_BRANDS.MAESTRO;
    case RegExp('^62,*').test(value):
      return CARD_BRANDS.UNIONPAY;
    case RegExp('^6,*').test(value):
      return CARD_BRANDS.MAESTRO;
    case RegExp('^35,*').test(value):
      return CARD_BRANDS.JCB;

    default:
      return CARD_BRANDS.ACCOUNT;
  }
};
