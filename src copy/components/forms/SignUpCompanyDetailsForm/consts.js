import React from 'react';
import { useTranslation } from 'react-i18next';

import capitalize from '@material-ui/core/utils/capitalize';
import isEmpty from 'lodash/isEmpty';
import { P } from '../../atoms';

import { CURRENCY_LIST } from '../../../constants/currencyList';
import { confirmDetailsNames } from '../../../utils/schemas/confirmDetailsSchema';

const OTHERS_VALUE = 'OTHER';

const CUSTOM_SELECT_PROPS = {
  placeholder: 'Select',
  errorProps: {
    margin: '-6px 0 14px 0',
  },
};

const generateOptions = (values) =>
  values.map((value) => ({
    value: value
      .split(' ')
      .join('_')
      .toUpperCase(),
    text: { text: value },
  }));

const currencyOptions = Object.keys(CURRENCY_LIST).map((currencyKey) => {
  return {
    value: currencyKey,
    text: { text: `${CURRENCY_LIST[currencyKey].name} ${CURRENCY_LIST[currencyKey].code}` },
  };
});

const sizeOptions = [
  {
    value: 'TWO_10',
    text: { text: '2 - 10' },
  },
  {
    value: 'ELEVEN_50',
    text: { text: '11 - 50' },
  },
  {
    value: 'FIFTY_1_100',
    text: { text: '51 - 100' },
  },
  {
    value: 'ONE_HUNDRED_1_500',
    text: { text: '101 - 500' },
  },
  {
    value: 'FIVE_HUNDRED_1_1000',
    text: { text: '501 - 1000' },
  },
  {
    value: 'ONE_THOUSAND_1_10000',
    text: { text: '1001 - 10000' },
  },
  {
    value: 'TEN_THOUSAND_PLUS',
    text: { text: '10001+' },
  },
];

const PAYMENT_PROCESSOR_OPTIONS = generateOptions([
  'Adyen',
  'Authorize.net',
  'Bambora',
  'Braintree',
  'Checkout.com',
  'Global Payments',
  'Moneris',
  'PayPal',
  'Stripe',
  'Worldline',
  'WorldPay',
  'Other',
]);

const PAYMENT_NEEDS_OPTIONS = generateOptions([
  'Processor Redundancy Automation',
  'Processor Routing Automation',
  'Payment Retry Automation',
  'Fraud Automation',
  'Delayed Capture Automation',
  'Payment Refund Automation',
  'Payment Billing Automation',
  'Payouts Automation',
  'Reconciliation Automation',
  'Payment Issues Automation',
  'Other',
]);

const SELECT_OPTIONS = {
  [confirmDetailsNames.currency]: currencyOptions,
  [confirmDetailsNames.companySize]: sizeOptions,
  [confirmDetailsNames.paymentProcessors]: PAYMENT_PROCESSOR_OPTIONS,
  [confirmDetailsNames.paymentNeeds]: PAYMENT_NEEDS_OPTIONS,
};

const OTHERS_INPUT_NAME_MAP = {
  [confirmDetailsNames.paymentProcessors]: confirmDetailsNames.paymentProcessorOthers,
  [confirmDetailsNames.paymentNeeds]: confirmDetailsNames.paymentNeedsOthers,
};

const SelectPlaceHolder = () => {
  const { t } = useTranslation();
  return <P color="#8e8f8f">{t('Select')}</P>;
};

const renderValue = (values, max) => {
  if (!Array.isArray(values)) return values;
  if (Array.isArray(values) && values.some((value) => typeof value !== 'string')) return values;

  if (isEmpty(values)) {
    return <SelectPlaceHolder />;
  }
  return (
    values
      ?.slice(0, max || values.length)
      ?.map((value) => capitalize(value?.toLowerCase()?.replace(/_/g, ' ') || ''))
      ?.join(', ') + (values?.length > (max || values.length) ? `...` : '')
  );
};

const RENDER_VALUE_MAP = {
  [confirmDetailsNames.paymentProcessors]: (value) => renderValue(value, 4),
  [confirmDetailsNames.paymentNeeds]: (value) => renderValue(value, 1),
};

export { SELECT_OPTIONS, CUSTOM_SELECT_PROPS, OTHERS_VALUE, OTHERS_INPUT_NAME_MAP, RENDER_VALUE_MAP, renderValue };
