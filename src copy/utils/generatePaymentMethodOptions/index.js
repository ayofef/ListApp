import { PAYMENT_METHODS_TITLE_MAP } from './paymentMethodTitles';
import { PAYMENT_METHOD_ICON_MAP } from '../../assets/icons/PaymentMethods';

const generateLabel = (paymentMethod) =>
  PAYMENT_METHODS_TITLE_MAP[paymentMethod] ??
  paymentMethod
    ?.toLowerCase()
    ?.split('_')
    ?.join(' ');

const getPaymentMethodsOption = (arr) => {
  if (!Array.isArray(arr)) {
    return arr;
  }

  const uniqueArr = [...new Set(arr ?? [])]?.filter(Boolean);

  return uniqueArr?.map((paymentMethod) => {
    if (typeof paymentMethod === 'object') {
      return {
        ...paymentMethod,
        label: generateLabel(paymentMethod?.paymentMethod),
        value: paymentMethod?.paymentMethod,
        icon: PAYMENT_METHOD_ICON_MAP[paymentMethod?.paymentMethod] ?? PAYMENT_METHOD_ICON_MAP.UNKNOWN,
      };
    }

    return {
      label: generateLabel(paymentMethod),
      value: paymentMethod,
      icon: PAYMENT_METHOD_ICON_MAP[paymentMethod] ?? PAYMENT_METHOD_ICON_MAP.UNKNOWN,
    };
  });
};

export { getPaymentMethodsOption };
