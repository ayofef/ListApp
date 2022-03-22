import CHECKOUT_IMG from '../../../../../assets/img/checkout.png';

const CHECKOUT_DICTIONARY = {
  none: 'CHECKOUT_NONE',
  checkoutUiSdk: 'CHECKOUT_UI_SDK',
  customCheckout: 'CHECKOUT_CUSTOM',
  hostedCheckout: 'HOSTED_CHECKOUT',
  checkoutPlugin: 'CHECKOUT_PLUGIN',
};

const CHECKOUT_TYPES = [
  {
    title: 'No selection',
    value: CHECKOUT_DICTIONARY.none,
  },
  {
    title: 'WhenThen Checkout UI',
    value: CHECKOUT_DICTIONARY.checkoutUiSdk,
    img: CHECKOUT_IMG,
    contentHeight: 304,
  },
  {
    title: 'Your Custom Checkout',
    value: CHECKOUT_DICTIONARY.customCheckout,
    img: CHECKOUT_IMG,
    contentHeight: 304,
  },
  {
    title: 'WhenThen Hosted Checkout',
    value: CHECKOUT_DICTIONARY.hostedCheckout,
    tag: 'Beta',
  },
  {
    title: 'E-commerce Checkout Plugin',
    value: CHECKOUT_DICTIONARY.checkoutPlugin,
    tag: 'Coming soon',
  },
];

const RADIO_NAME = 'WhenThen-Checkout-Type';

export { CHECKOUT_TYPES, RADIO_NAME, CHECKOUT_DICTIONARY };
