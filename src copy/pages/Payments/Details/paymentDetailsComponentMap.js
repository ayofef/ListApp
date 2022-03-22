import ProcessorComponent from './_common/ProcessorComponent';
import DateComponent from './_common/DateComponent';
import JsonComponent from './_common/JsonComponent';
import CountryIconLabelComponent from './_common/CountryIconLabelComponent';

import { PAYMENT_DESCRIBED_KEYS } from './paymentDescribedDataKeys';

const PAYMENT_DETAILS_SECTION_COMPONENT_MAP = {
  [PAYMENT_DESCRIBED_KEYS.paymentProcessor]: ProcessorComponent,
  [PAYMENT_DESCRIBED_KEYS.fraudDate]: DateComponent,
  [PAYMENT_DESCRIBED_KEYS.fraudAdditionalData]: JsonComponent,
  [PAYMENT_DESCRIBED_KEYS.intentLocation]: CountryIconLabelComponent,
  [PAYMENT_DESCRIBED_KEYS.country]: CountryIconLabelComponent,
};

export { PAYMENT_DETAILS_SECTION_COMPONENT_MAP };
