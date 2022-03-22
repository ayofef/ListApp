const PAYMENT_DESCRIBED_KEYS = {
  name: 'name',
  statementDescriptor: 'statementDescriptor',
  localCurrency: 'localCurrency',
  localAmount: 'localAmount',
  exchangeRate: 'exchangeRate',
  fee: 'fee',
  tax: 'tax',
  processingFee: 'processingFee',
  net: 'net',
  description: 'description',
  id: 'id',
  number: 'number',
  expires: 'expires',
  fingerprint: 'fingerprint',
  paymentMethod: 'paymentMethod',
  type: 'type',
  product: 'product',
  issuingBank: 'issuingBank',
  category: 'category',
  paymentProcessor: 'paymentProcessor',
  amount: 'amount',
  currency: 'currency',
  sourceId: 'sourceId',
  invoiceNumber: 'invoiceNumber',
  country: 'country',

  //Fraud
  fraudScore: 'score',
  fraudDate: 'date',
  fraudProvider: 'fraudProvider',
  fraudAdditionalData: 'additionalData',

  //Intent
  intentLocation: 'intentLocation',
};

const PAYMENT_DETAILS_DATA_KEYS = [
  PAYMENT_DESCRIBED_KEYS.sourceId,
  PAYMENT_DESCRIBED_KEYS.paymentProcessor,
  PAYMENT_DESCRIBED_KEYS.statementDescriptor,
  PAYMENT_DESCRIBED_KEYS.localCurrency,
  PAYMENT_DESCRIBED_KEYS.localAmount,
  PAYMENT_DESCRIBED_KEYS.exchangeRate,
  PAYMENT_DESCRIBED_KEYS.fee,
  PAYMENT_DESCRIBED_KEYS.tax,
  PAYMENT_DESCRIBED_KEYS.processingFee,
  PAYMENT_DESCRIBED_KEYS.net,
  PAYMENT_DESCRIBED_KEYS.description,
  PAYMENT_DESCRIBED_KEYS.invoiceNumber,
];

const PAYMENT_METHOD_DATA_KEYS = [
  PAYMENT_DESCRIBED_KEYS.id,
  PAYMENT_DESCRIBED_KEYS.number,
  PAYMENT_DESCRIBED_KEYS.expires,
  PAYMENT_DESCRIBED_KEYS.country,
  PAYMENT_DESCRIBED_KEYS.fingerprint,
  PAYMENT_DESCRIBED_KEYS.paymentMethod,
  PAYMENT_DESCRIBED_KEYS.type,
  PAYMENT_DESCRIBED_KEYS.product,
  PAYMENT_DESCRIBED_KEYS.issuingBank,
  PAYMENT_DESCRIBED_KEYS.category,
];

const FRAUD_DATA_KEYS = [
  PAYMENT_DESCRIBED_KEYS.fraudDate,
  PAYMENT_DESCRIBED_KEYS.fraudScore,
  PAYMENT_DESCRIBED_KEYS.fraudProvider,
  PAYMENT_DESCRIBED_KEYS.fraudAdditionalData,
];

const INTENT_SECTION_DATA_KEYS = [
  PAYMENT_DESCRIBED_KEYS.amount,
  PAYMENT_DESCRIBED_KEYS.currency,
  PAYMENT_DESCRIBED_KEYS.intentLocation,
];

export {
  PAYMENT_DESCRIBED_KEYS,
  PAYMENT_DETAILS_DATA_KEYS,
  PAYMENT_METHOD_DATA_KEYS,
  FRAUD_DATA_KEYS,
  INTENT_SECTION_DATA_KEYS,
};
