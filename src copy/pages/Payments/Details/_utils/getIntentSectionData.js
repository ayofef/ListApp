import { PAYMENT_DESCRIBED_KEYS } from '../paymentDescribedDataKeys';

const getIntentSectionData = (intent) => ({
  key: 'intent',
  type: 'OBJECT',
  value: [
    {
      key: PAYMENT_DESCRIBED_KEYS.amount,
      label: 'Amount',
      value: intent.amount?.formattedAmount,
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.currency,
      label: 'Currency',
      value: intent.currency,
    },
    {
      key: PAYMENT_DESCRIBED_KEYS.intentLocation,
      label: 'Location',
      value: intent.location?.country,
    },
  ],
});

export { getIntentSectionData };
