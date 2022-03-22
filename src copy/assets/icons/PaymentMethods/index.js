import { PAYMENT_METHODS } from '../../../utils/generatePaymentMethodOptions/paymentMethodDictionary';

import Visa from './Visa';
import MasterCard from './MasterCard';
import Sepa from './Sepa';
import Amex from './Amex';
import Applepay from './Applepay';
import Googlepay from './Googlepay';
import Paypal from './Paypal';
import Ach from './Ach';
import Crypto from './Crypto';
import DirectDebit from './DirectDebit';
import Unknown from './Unknown';
import Cash from './Cash';
import Account from './Account';
import BNPL from './BNPL';
import Maestro from './Maestro';
import Discover from './Discover';
import Diners from './Diners';
import Unionpay from './Unionpay';
import Jcb from './Jcb';
import BanContact from './BanContact';
import Ideal from './Ideal';
import Giropay from './Giropay';
import Sofort from './Sofort';
import AliPay from './AliPay';
import WeChat from './WeChat';
import Affirm from './Affirm';

const PAYMENT_METHOD_ICON_MAP = {
  [PAYMENT_METHODS.MASTERCARD]: MasterCard,
  [PAYMENT_METHODS.VISA]: Visa,
  [PAYMENT_METHODS.AMEX]: Amex,
  [PAYMENT_METHODS.APPLE_PAY]: Applepay,
  [PAYMENT_METHODS.GOOGLE_PAY]: Googlepay,
  [PAYMENT_METHODS.PAYPAL]: Paypal,
  [PAYMENT_METHODS.ACH]: Ach,
  [PAYMENT_METHODS.ACH_CREDIT]: Ach,
  [PAYMENT_METHODS.ACH_DEBIT]: Ach,
  [PAYMENT_METHODS.CRYPTO]: Crypto,
  [PAYMENT_METHODS.DIRECT_DEBIT]: DirectDebit,
  [PAYMENT_METHODS.UNKNOWN_CARD]: Unknown,
  [PAYMENT_METHODS.UNKNOWN]: Unknown,
  [PAYMENT_METHODS.CASH]: Cash,
  [PAYMENT_METHODS.CARD]: Unknown,
  [PAYMENT_METHODS.SEPA_CREDIT_TRANSFER]: Sepa,
  [PAYMENT_METHODS.SEPA_DIRECT_DEBIT]: Sepa,
  [PAYMENT_METHODS.IDEAL]: Ideal,
  [PAYMENT_METHODS.DIRECT_DEBIT]: DirectDebit,
  [PAYMENT_METHODS.BAN_CONTACT]: BanContact,
  [PAYMENT_METHODS.GIRO_PAY]: Giropay,
  [PAYMENT_METHODS.SOFORT]: Sofort,
  [PAYMENT_METHODS.WALLET]: Cash,
  [PAYMENT_METHODS.GOOGLE_PAY]: Googlepay,
  [PAYMENT_METHODS.ALI_PAY]: AliPay,
  [PAYMENT_METHODS.WE_CHAT]: WeChat,
  [PAYMENT_METHODS.KLARNA]: BNPL,
  [PAYMENT_METHODS.BUY_NOW_PAY_LATER]: BNPL,
  [PAYMENT_METHODS.AFFIRM]: Affirm,
  [PAYMENT_METHODS.CRYPTO]: Crypto,
  [PAYMENT_METHODS.BITCOIN]: Crypto,
  [PAYMENT_METHODS.ACCOUNT]: Account,
  [PAYMENT_METHODS.WALLET]: Cash,

  DEBIT: Visa,
  CREDIT: MasterCard,
  DISCOVER: Discover,
  DINERS: Diners,
  MAESTRO: Maestro,
  UNIONPAY: Unionpay,
  UNION_PAY: Unionpay,
  JCB: Jcb,
};

export {
  Visa,
  MasterCard,
  Sepa,
  Amex,
  Applepay,
  Googlepay,
  Paypal,
  BNPL,
  Account,
  Cash,
  Unknown,
  DirectDebit,
  Crypto,
  Discover,
  Diners,
  PAYMENT_METHOD_ICON_MAP,
};
