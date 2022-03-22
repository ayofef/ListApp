import * as Yup from 'yup';

import AsyncFieldset from '../../Payments/FilterList/fields/AsyncFieldset';
import { SEARCH_KEYS } from '../../../utils/filterToSearchParams/constants';
import { createFilterPropsFromSettings } from '../../../utils/createFilterPropsFromSettings';

import { useGetPaymentGateways, useGetMethod, useGetFlowFilter, useGetCountries } from '../../../hooks/useGetOptions';

const FIELDS_SETTINGS = [
  {
    name: SEARCH_KEYS.processor,
    label: 'processor',
    component: AsyncFieldset,
    props: { useGetOptions: useGetPaymentGateways },
    defaultValue: [],
  },
  {
    name: SEARCH_KEYS.paymentMethod,
    label: 'payment method',
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
];

const { FIELDS, SHAPE, DEFAULT_VALUES } = createFilterPropsFromSettings(FIELDS_SETTINGS);

const validationSchema = Yup.object().shape(SHAPE);

export { FIELDS, validationSchema, DEFAULT_VALUES };
