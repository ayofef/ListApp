import { PAYMENT_FIELDS } from '../../../constants/paymentFields';

const hiddenByDefault = [
  PAYMENT_FIELDS.country,
  PAYMENT_FIELDS.sourceId,
  PAYMENT_FIELDS.corePaymentMethod,
  PAYMENT_FIELDS.net,
  PAYMENT_FIELDS.fee,
  PAYMENT_FIELDS.tax,
  PAYMENT_FIELDS.description,
  PAYMENT_FIELDS.statementDescriptor,
  PAYMENT_FIELDS.exchangeRate,
  PAYMENT_FIELDS.localCurrency,
  PAYMENT_FIELDS.localAmount,
  PAYMENT_FIELDS.customerId,
  PAYMENT_FIELDS.id,
  PAYMENT_FIELDS.paymentServiceId,
  PAYMENT_FIELDS.preferredPaymentMethod,
  PAYMENT_FIELDS.receiptDate,
  PAYMENT_FIELDS.receiptType,
  PAYMENT_FIELDS.receiptMessage,
  PAYMENT_FIELDS.receiptUrl,
  PAYMENT_FIELDS.reason,
  PAYMENT_FIELDS.riskLevel,
  PAYMENT_FIELDS.riskScore,
  PAYMENT_FIELDS.declineCode,
  PAYMENT_FIELDS.id,
  PAYMENT_FIELDS.latestCharge,
  PAYMENT_FIELDS.invoice,
  PAYMENT_FIELDS.payout,
  PAYMENT_FIELDS.processingFee,
  PAYMENT_FIELDS.cardType,
  PAYMENT_FIELDS.cardProduct,
  PAYMENT_FIELDS.cardIssuingBank,
  PAYMENT_FIELDS.category,
  PAYMENT_FIELDS.phone,
];

const INITIAL_TABLE_STATE = {
  tableState: {
    columnResizing: {
      columnWidths: [],
    },
    columnOrder: [],
    sortBy: [],

    hiddenColumns: hiddenByDefault,
  },
};

const transformHiddenColumnsFn = (state) => state?.hiddenFields?.fields?.map((item) => item?.value) ?? hiddenByDefault;

export { INITIAL_TABLE_STATE, transformHiddenColumnsFn, hiddenByDefault };
