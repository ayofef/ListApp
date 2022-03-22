import isEmpty from 'lodash/isEmpty';
import reduceValue from './reduceValue';

import { mockedPaymentDetails } from '../mockedData';
import { PAYMENT_DESCRIBED_KEYS } from '../paymentDescribedDataKeys';

const getPaymentDetailsSectionData = ({ isIntent, payment }) => {
  // empty state
  if (isIntent || isEmpty(payment?.paymentDetails?.value)) return mockedPaymentDetails;

  const processor = reduceValue(payment.paymentGateway?.value);

  return {
    ...(payment?.paymentDetails || {}),
    value: [
      ...(payment?.paymentDetails?.value || []),
      { ...processor, label: 'Processor', key: PAYMENT_DESCRIBED_KEYS.paymentProcessor },
      {
        value: payment.sourceId?.value || 'N/A',
        label: 'Payment Processor Id',
        key: PAYMENT_DESCRIBED_KEYS.sourceId,
      },
    ],
  };
};

export { getPaymentDetailsSectionData };
