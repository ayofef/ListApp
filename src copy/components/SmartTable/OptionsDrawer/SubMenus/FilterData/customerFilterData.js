import * as Yup from 'yup';
import FieldsWithSelect from '../../../../../pages/Payments/FilterList/fields/FieldsWithSelect';

import { OPTIONS as dateOptions } from '../../../../../pages/Payments/FilterList/fields/DateField/settings';
import CustomDateField from '../../../../../pages/Payments/FilterList/fields/DateField/CustomField';
import AsyncFieldset from '../../../../../pages/Payments/FilterList/fields/AsyncFieldset';
import { createFilterPropsFromSettings } from '../../../../../utils/createFilterPropsFromSettings';
import { useGetCustomerDefaultPaymentMethod } from '../../../../../hooks/useGetOptions';

const FIELDS_SETTINGS = [
  {
    name: 'systemCreated',
    label: 'date',
    component: FieldsWithSelect,
    props: { options: dateOptions, component: CustomDateField, divider: 'and' },
    defaultValue: {},
  },
  {
    name: 'defaultPaymentMethod',
    label: 'Default payment method',
    component: AsyncFieldset,
    props: { useGetOptions: useGetCustomerDefaultPaymentMethod },
    defaultValue: [],
  },
];

const { FIELDS: CUSTOMER_FIELDS, SHAPE, DEFAULT_VALUES: CUSTOMER_DEFAULT_VALUES } = createFilterPropsFromSettings(
  FIELDS_SETTINGS
);

const customerValidationSchema = Yup.object().shape(SHAPE);

export { CUSTOMER_FIELDS, customerValidationSchema, CUSTOMER_DEFAULT_VALUES };
