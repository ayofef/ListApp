import * as Yup from 'yup';

import AsyncFieldset from './fields/AsyncFieldset';
import FieldsWithSelect from './fields/FieldsWithSelect';
import { OPTIONS as dateOptions, RANGE_OPTIONS } from './fields/DateField/settings';
import CustomDateField from './fields/DateField/CustomField';
import { OPTIONS as numberOptions } from './fields/NumberField/settings';
import CustomNumberField from './fields/NumberField/CustomField';
import { SEARCH_KEYS, GT, LT } from '../../../utils/filterToSearchParams/constants';
import { createFilterPropsFromSettings } from '../../../utils/createFilterPropsFromSettings';
import SelectField from './fields/SelectField';
import {
  useGetCountries,
  useGetCurrencies,
  useGetMethod,
  useGetPaymentGateways,
  useGetStatuses,
  useGetFlowFilter,
  useGetCategories,
} from '../../../hooks/useGetOptions';

const lessMessage = ({ less }) => `must be greater than ${less}`;
const moreMessage = ({ more }) => `must be less than ${more}`;
const positive = 'must be a positive number';
const typeError = 'NaN'; //suppressed error to prevent triggering the valid state when we pass an empty string instead.

const FIELDS_SETTINGS = [
  {
    name: SEARCH_KEYS.dateRange,
    label: 'date range',
    component: SelectField,
    props: { options: RANGE_OPTIONS },
    defaultValue: '',
  },
  {
    name: SEARCH_KEYS.date,
    label: 'date',
    component: FieldsWithSelect,
    props: { options: dateOptions, component: CustomDateField, divider: 'and' },
    defaultValue: {},
  },
  {
    name: SEARCH_KEYS.amount,
    label: 'amount',
    component: FieldsWithSelect,
    props: { options: numberOptions, component: CustomNumberField, divider: 'and' },
    defaultValue: {},
    schema: Yup.object().shape(
      {
        [LT]: Yup.number()
          .positive(positive)
          .when(`${GT}`, (gt, schema) => (gt ? schema.moreThan(Yup.ref(GT), moreMessage) : schema))
          .typeError(typeError),
        [GT]: Yup.number()
          .positive(positive)
          .when(`${LT}`, (lt, schema) => (lt ? schema.lessThan(Yup.ref(LT), lessMessage) : schema))
          .typeError(typeError),
      },
      [LT, GT]
    ),
  },
  {
    name: SEARCH_KEYS.currency,
    label: 'currency',
    component: AsyncFieldset,
    props: { useGetOptions: useGetCurrencies },
    defaultValue: [],
  },
  {
    name: SEARCH_KEYS.processor,
    label: 'processor',
    component: AsyncFieldset,
    props: { useGetOptions: useGetPaymentGateways },
    defaultValue: [],
  },
  {
    name: SEARCH_KEYS.paymentMethod,
    label: 'Method',
    component: AsyncFieldset,
    props: { useGetOptions: useGetMethod },
    defaultValue: [],
  },
  // {
  //   name: SEARCH_KEYS.paymentType,
  //   label: 'payment type',
  //   component: AsyncFieldset,
  //   props: { useGetOptions: useGetType },
  //   defaultValue: [],
  // },
  {
    name: SEARCH_KEYS.paymentStatus,
    label: 'Status',
    component: AsyncFieldset,
    props: { useGetOptions: useGetStatuses },
    defaultValue: [],
  },
  {
    name: SEARCH_KEYS.country,
    label: 'Country',
    component: AsyncFieldset,
    props: { useGetOptions: useGetCountries },
    defaultValue: [],
  },
  {
    name: SEARCH_KEYS.flowId,
    label: 'flow',
    component: AsyncFieldset,
    props: { useGetOptions: useGetFlowFilter },
    defaultValue: [],
  },
  {
    name: SEARCH_KEYS.category,
    label: 'category',
    component: AsyncFieldset,
    props: { useGetOptions: useGetCategories },
    defaultValue: [],
  },
];

const { FIELDS, SHAPE, DEFAULT_VALUES } = createFilterPropsFromSettings(FIELDS_SETTINGS);

const validationSchema = Yup.object().shape(SHAPE);

export { FIELDS, validationSchema, DEFAULT_VALUES };
