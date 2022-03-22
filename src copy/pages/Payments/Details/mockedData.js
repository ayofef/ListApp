import { PAYMENT_DESCRIBED_KEYS } from './paymentDescribedDataKeys';

export const mockedPaymentMethod = {
  key: 'paymentMethodDetails',
  type: 'OBJECT',
  label: 'Method Details',
  isEditable: false,
  value: [
    {
      key: PAYMENT_DESCRIBED_KEYS.id,
      type: 'STRING',
      label: 'Id',
      isEditable: false,
      value: 'N/A',
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.number,
      type: 'STRING',
      label: 'Number',
      isEditable: false,
      value: 'N/A',
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.expires,
      type: 'DATE',
      label: 'Expires',
      isEditable: false,
      value: 'N/A',
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.country,
      type: 'STRING',
      label: 'Country',
      isEditable: false,
      value: 'N/A',
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.fingerprint,
      type: 'STRING',
      label: 'Fingerprint',
      isEditable: false,
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.paymentMethod,
      type: 'STRING',
      label: 'Payment Method',
      isEditable: false,
      value: 'N/A',
    },
  ],
  __typename: 'FieldDefinition',
};

export const mockedPaymentDetails = {
  key: 'paymentDetails',
  type: 'OBJECT',
  label: 'Details',
  isEditable: false,
  value: [
    {
      key: PAYMENT_DESCRIBED_KEYS.sourceId,
      type: 'STRING',
      label: 'Payment Processor Id',
      isEditable: false,
      value: 'N/A',
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.statementDescriptor,
      type: 'STRING',
      label: 'Statement Descriptor',
      isEditable: false,
      value: 'N/A',
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.localCurrency,
      type: 'STRING',
      label: 'Local Currency',
      isEditable: false,
      value: 'N/A',
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.localAmount,
      type: 'AMOUNT',
      label: 'Local Amount',
      isEditable: false,
      value: 'N/A',
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.exchangeRate,
      type: 'STRING',
      label: 'Exchange Rate',
      isEditable: false,
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.fee,
      type: 'AMOUNT',
      label: 'Fee',
      isEditable: false,
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.tax,
      type: 'AMOUNT',
      label: 'Tax',
      isEditable: false,
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.processingFee,
      type: 'AMOUNT',
      label: 'Processing Fee',
      isEditable: false,
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.net,
      type: 'AMOUNT',
      label: 'Net',
      isEditable: false,
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.description,
      type: 'STRING',
      label: 'Description',
      isEditable: false,
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.invoiceNumber,
      type: 'STRING',
      label: 'Invoice Number',
      value: '{}',
    },
  ],
  __typename: 'FieldDefinition',
};

export const MOCK_FRAUD_DATA = {
  key: 'fraud',
  type: 'OBJECT',
  label: 'Fraud',
  value: [
    {
      key: PAYMENT_DESCRIBED_KEYS.fraudDate,
      type: 'STRING',
      label: 'Date',
      value: null,
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.fraudScore,
      type: 'STRING',
      label: 'Score',
      value: 'N/A',
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.fraudProvider,
      type: 'DATE',
      label: 'Fraud Provider',
      value: 'N/A',
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.fraudAdditionalData,
      type: 'STRING',
      label: 'Additional data',
      value: '{}',
    },
  ],
  __typename: 'FieldDefinition',
};
