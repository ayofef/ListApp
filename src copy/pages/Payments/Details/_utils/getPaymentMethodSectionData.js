import isEmpty from 'lodash/isEmpty';

import { mockedPaymentMethod } from '../mockedData';
import { PAYMENT_DESCRIBED_KEYS } from '../paymentDescribedDataKeys';

const getPaymentMethodSectionData = ({ isIntent, payment }) => {
  if (isIntent || isEmpty(payment?.paymentMethodDetails?.value)) return mockedPaymentMethod;

  const data = payment.paymentMethodDetails || {};

  const paymentCountryObj = {
    ...(payment.country || {}),
    value: payment.country?.value || 'N/A',
    key: PAYMENT_DESCRIBED_KEYS.country,
  };

  return {
    ...data,
    value: [...(data.value || []), paymentCountryObj],
  };
};

export { getPaymentMethodSectionData };
