import { CHECKOUT_DICTIONARY } from '../../../CheckoutType/constant';

const devZoneUrl = process.env.REACT_APP_DEV_ZONE_URL;

const INTENT = {
  sdk: 'Intent SDK',
  title: 'Monitor, analyse and optimise your checkout via WhenThen',
  link: `${devZoneUrl}/intent`,
};

const PAYMENT = {
  sdk: 'Payments',
  title: 'Process a payment',
  link: `${devZoneUrl}/api-reference/payment`,
};

const CHECKOUT_UI_DEVELOPER_GUIDANCE = [
  INTENT,
  {
    sdk: 'Checkout SDK',
    title: 'Fully customizable Checkout UI',
    link: `${devZoneUrl}/instruct/checkout`,
  },
  PAYMENT,
];

const CUSTOM_CHECKOUT_DEVELOPER_GUIDANCE = [
  INTENT,
  {
    sdk: 'Vault',
    title: 'Build your own payment form or integrate your existing checkout',
    link: `${devZoneUrl}/api-reference/vault`,
  },
  PAYMENT,
];

const DEVELOPER_GUIDANCE = {
  [CHECKOUT_DICTIONARY.checkoutUiSdk]: CHECKOUT_UI_DEVELOPER_GUIDANCE,
  [CHECKOUT_DICTIONARY.customCheckout]: CUSTOM_CHECKOUT_DEVELOPER_GUIDANCE,
};

export { DEVELOPER_GUIDANCE };
