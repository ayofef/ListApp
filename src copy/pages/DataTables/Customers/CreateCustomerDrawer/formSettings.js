import * as Yup from 'yup';
import buildValidator from '../../../../utils/validators/buildValidator';
import { LABEL_MAP } from '../../components/Details/constant';
import { NAME_VALIDATOR, addressObj } from '../../components/FormComponents/constant';

const FIELDS_NAME = {
  email: 'email',
  name: 'name',
  description: 'description',
  phone: 'phone',

  shipping_phone: 'shippingAddress.phone',
  shipping_name: 'shippingAddress.name',
  shipping_address_line1: 'shippingAddress.address.line1',
  shipping_address_line2: 'shippingAddress.address.line2',
  shipping_postalCode: 'shippingAddress.address.postalCode',
  shipping_city: 'shippingAddress.address.city',
  shipping_state: 'shippingAddress.address.state',
  shipping_country: 'shippingAddress.address.country',

  billing_address_line1: 'billingAddress.line1',
  billing_address_line2: 'billingAddress.line2',
  billing_postalCode: 'billingAddress.postalCode',
  billing_city: 'billingAddress.city',
  billing_state: 'billingAddress.state',
  billing_country: 'billingAddress.country',
};

const INITIAL_VALUES = {
  [FIELDS_NAME.name]: '',
  [FIELDS_NAME.email]: '',
  [FIELDS_NAME.phone]: '',
  [FIELDS_NAME.description]: '',
  billingAddress: addressObj,
  shippingAddress: {
    name: '',
    phone: '',
    address: addressObj,
  },
};

const validationSchema = buildValidator(
  Yup.lazy(() =>
    Yup.object().shape({
      [FIELDS_NAME.name]: NAME_VALIDATOR,
      [FIELDS_NAME.email]: Yup.string()
        .email('Email is not valid')
        .nullable(),
    })
  )
);

const FIELDS = [
  { name: FIELDS_NAME.name, type: 'text', componentType: 'input', placeholder: 'John Doe' },
  { name: FIELDS_NAME.email, type: 'text', componentType: 'input', placeholder: 'john@example.com' },
  { name: FIELDS_NAME.phone, type: 'text', componentType: 'phone', placeholder: '0000 0000' },
  { name: FIELDS_NAME.description, type: 'text', componentType: 'input', placeholder: '' },
  {
    name: 'shipping address',
    type: 'nestedObject',
    fields: [
      { name: FIELDS_NAME.shipping_name, type: 'text', componentType: 'input', label: 'name', placeholder: 'John Doe' },
      { name: FIELDS_NAME.shipping_phone, type: 'text', componentType: 'phone', label: 'phone' },
      {
        name: FIELDS_NAME.shipping_country,
        type: 'text',
        componentType: 'countrySelect',
        label: 'Country',
        placeholder: 'Select country',
      },
      {
        name: FIELDS_NAME.shipping_address_line1,
        type: 'text',
        componentType: 'input',
        label: LABEL_MAP.line1,
        placeholder: 'Address line 1',
      },
      {
        name: FIELDS_NAME.shipping_address_line2,
        type: 'text',
        componentType: 'input',
        label: LABEL_MAP.line2,
        placeholder: 'Address line 2',
      },
      {
        name: FIELDS_NAME.shipping_postalCode,
        type: 'text',
        componentType: 'input',
        label: 'Postal code',
        placeholder: 'Postal code',
      },
      {
        name: FIELDS_NAME.shipping_city,
        type: 'text',
        componentType: 'input',
        label: 'City',
        placeholder: 'City',
      },
      { name: FIELDS_NAME.shipping_state, type: 'text', componentType: 'input', label: 'State', placeholder: 'State' },
    ],
  },
  {
    name: 'billing address',
    type: 'nestedObject',
    fields: [
      {
        name: FIELDS_NAME.billing_country,
        type: 'text',
        componentType: 'countrySelect',
        label: 'Country',
        placeholder: 'Select country',
      },
      {
        name: FIELDS_NAME.billing_address_line1,
        type: 'text',
        componentType: 'input',
        label: LABEL_MAP.line1,
        placeholder: 'Address line 1',
      },
      {
        name: FIELDS_NAME.billing_address_line2,
        type: 'text',
        componentType: 'input',
        label: LABEL_MAP.line2,
        placeholder: 'Address line 2',
      },
      {
        name: FIELDS_NAME.billing_postalCode,
        type: 'text',
        componentType: 'input',
        label: 'Postal code',
        placeholder: 'Postal code',
      },
      { name: FIELDS_NAME.billing_city, type: 'text', componentType: 'input', label: 'City', placeholder: 'City' },
      { name: FIELDS_NAME.billing_state, type: 'text', componentType: 'input', label: 'State', placeholder: 'State' },
    ],
  },
];

export { FIELDS, INITIAL_VALUES, validationSchema };
