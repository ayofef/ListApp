import * as Yup from 'yup';
import FieldsWithSelect from '../../../../../pages/Payments/FilterList/fields/FieldsWithSelect';

import { OPTIONS as dateOptions } from '../../../../../pages/Payments/FilterList/fields/DateField/settings';
import CustomDateField from '../../../../../pages/Payments/FilterList/fields/DateField/CustomField';
import AsyncFieldset from '../../../../../pages/Payments/FilterList/fields/AsyncFieldset';
import { createFilterPropsFromSettings } from '../../../../../utils/createFilterPropsFromSettings';
import {
  useGetCardsCountry,
  useGetBankName,
  useGetCardTypes,
  useGetCardProduct,
  useGetCardBrand,
} from '../../../../../hooks/useGetOptions';

const FIELDS_SETTINGS = [
  {
    name: 'systemCreated',
    label: 'date',
    component: FieldsWithSelect,
    props: { options: dateOptions, component: CustomDateField, divider: 'and' },
    defaultValue: {},
  },
  {
    name: 'country',
    label: 'Country',
    component: AsyncFieldset,
    props: { useGetOptions: useGetCardsCountry },
    defaultValue: [],
  },
  {
    name: 'bankName',
    label: 'Issuer',
    component: AsyncFieldset,
    props: { useGetOptions: useGetBankName },
    defaultValue: [],
  },
  {
    name: 'brand',
    label: 'Card brand',
    component: AsyncFieldset,
    props: { useGetOptions: useGetCardBrand },
    defaultValue: [],
  },
  {
    name: 'type',
    label: 'Card type',
    component: AsyncFieldset,
    props: { useGetOptions: useGetCardTypes },
    defaultValue: [],
  },
  {
    name: 'product',
    label: 'Card product',
    component: AsyncFieldset,
    props: { useGetOptions: useGetCardProduct },
    defaultValue: [],
  },
];

const { FIELDS: CARD_FIELDS, SHAPE, DEFAULT_VALUES: CARD_DEFAULT_VALUES } = createFilterPropsFromSettings(
  FIELDS_SETTINGS
);

const cardValidationSchema = Yup.object().shape(SHAPE);

export { CARD_FIELDS, cardValidationSchema, CARD_DEFAULT_VALUES };
