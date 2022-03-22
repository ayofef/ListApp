import * as Yup from 'yup';
import omit from 'lodash/omit';
import get from 'lodash/get';
import { LABEL_MAP } from '../../components/Details/constant';
import { NAME_VALIDATOR, addressObj } from '../../components/FormComponents/constant';

const FIELDS_NAME = {
  customer_id: 'customer.id',

  paymentMethod_card_name: 'paymentMethod.card.name',
  paymentMethod_card_number: 'paymentMethod.card.number',
  paymentMethod_card_expMonth: 'paymentMethod.card.expMonth',
  paymentMethod_card_expYear: 'paymentMethod.card.expYear',
  paymentMethod_card_cvc: 'paymentMethod.card.cvc',
  paymentMethod_card_expiry: 'paymentMethod.card.expiry',

  paymentMethod_card_billing_address_line1: 'paymentMethod.card.billingAddress.line1',
  paymentMethod_card_billing_address_line2: 'paymentMethod.card.billingAddress.line2',
  paymentMethod_card_billing_postalCode: 'paymentMethod.card.billingAddress.postalCode',
  paymentMethod_card_billing_city: 'paymentMethod.card.billingAddress.city',
  paymentMethod_card_billing_state: 'paymentMethod.card.billingAddress.state',
  paymentMethod_card_billing_country: 'paymentMethod.card.billingAddress.country',
};

const INITIAL_VALUES = {
  externalId: '',
  customer: {
    id: '',
  },
  paymentMethod: {
    card: {
      number: '',
      expMonth: '',
      expYear: '',
      cvc: '',
      name: '',
      billingAddress: addressObj,
      expiry: '',
    },
  },
};

const getCentury = () => {
  const date = new Date();
  const century = date
    .getFullYear()
    .toString()
    .substring(0, 2);

  return century;
};

const isExpired = (value) => {
  if (!value) {
    return false;
  }

  if (value?.length < 5) {
    return false;
  }
  const century = getCentury();
  const [month, year] = value?.split('/');
  const parsedYear = year?.length === 2 ? `${century}${year}` : `${year}`;
  const today = new Date();
  const compareDay = new Date();
  compareDay.setFullYear(Number(parsedYear), Number(month), 1);
  return today < compareDay;
};

const validationSchema = Yup.object().shape({
  paymentMethod: Yup.object().shape({
    card: Yup.object().shape({
      name: NAME_VALIDATOR,
      number: Yup.number()
        .required('Card number is required')
        .typeError('Card number must be a number')
        .test('luhnCheck', 'Invalid card number', (val = '') => {
          let value = val.toString();
          // Accept only digits or spaces
          if (/[^0-9\s]+/.test(value)) return false;

          // The Luhn Algorithm.
          let nCheck = 0;
          let bEven = false;
          value = value.replace(/\D/g, '');

          for (let n = value.length - 1; n >= 0; n--) {
            const cDigit = value.charAt(n);
            let nDigit = parseInt(cDigit, 10);

            // eslint-disable-next-line no-cond-assign
            if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

            nCheck += nDigit;
            bEven = !bEven;
          }
          return nCheck % 10 === 0;
        }),
      cvc: Yup.string()
        .required('CVC is required')
        .min(3, 'Minimum of 3 digits'),
      expiry: Yup.string()
        .required('Expiry date is required')
        .trim()
        .min(5, 'Invalid expiry date')
        .test('expired', 'Card is expired', (value) => {
          return isExpired(value);
        }),
    }),
  }),
});
const FIELDS = [
  {
    name: 'Customer details',
    type: 'nestedObject',
    fields: [
      {
        name: FIELDS_NAME.customer_id,
        type: 'text',
        componentType: 'CustomerId',
        label: 'customer id (optional)',
        placeholder: '0000-0000-0000-0000',
      },
    ],
  },
  {
    name: 'Card details',
    type: 'nestedObject',
    fields: [
      {
        name: FIELDS_NAME.paymentMethod_card_name,
        type: 'text',
        componentType: 'input',
        label: 'Name',
        placeholder: 'John Doe',
      },
      {
        name: {
          number: FIELDS_NAME.paymentMethod_card_number,
          cvc: FIELDS_NAME.paymentMethod_card_cvc,
          expiry: FIELDS_NAME.paymentMethod_card_expiry,
        },
        type: 'text',
        componentType: 'cardData',
        label: 'Expiry date',
      },

      {
        name: 'billing address',
        type: 'nestedObject',
        fields: [
          {
            name: FIELDS_NAME.paymentMethod_card_billing_country,
            type: 'text',
            componentType: 'countrySelect',
            label: 'Country',
            placeholder: 'Select country',
          },
          {
            name: FIELDS_NAME.paymentMethod_card_billing_address_line1,
            type: 'text',
            componentType: 'input',
            label: LABEL_MAP.line1,
            placeholder: 'Address line 1',
          },
          {
            name: FIELDS_NAME.paymentMethod_card_billing_address_line2,
            type: 'text',
            componentType: 'input',
            label: LABEL_MAP.line2,
            placeholder: 'Address line 2',
          },
          {
            name: FIELDS_NAME.paymentMethod_card_billing_postalCode,
            type: 'text',
            componentType: 'input',
            label: 'Postal code',
            placeholder: 'Postal code',
          },
          {
            name: FIELDS_NAME.paymentMethod_card_billing_city,
            type: 'text',
            componentType: 'input',
            label: 'City',
            placeholder: 'City',
          },
          {
            name: FIELDS_NAME.paymentMethod_card_billing_state,
            type: 'text',
            componentType: 'input',
            label: 'State',
            placeholder: 'State',
          },
        ],
      },
    ],
  },
];

const parseValue = (val) => {
  const [expMonth, expYear] = get(val, FIELDS_NAME.paymentMethod_card_expiry).split('/');
  const customerId = get(val, FIELDS_NAME.customer_id);

  const century = getCentury();

  const parsedVal = {
    ...(customerId && { customer: { id: customerId } }),
    paymentMethod: {
      ...val.paymentMethod,
      card: {
        ...val.paymentMethod.card,
        number: val.paymentMethod.card.number
          .split(' ')
          .join('')
          .trim(),
        expMonth: parseInt(expMonth, 10),
        expYear: expYear?.length === 2 ? parseInt(`${century}${expYear}`, 10) : parseInt(expYear, 10),
      },
    },
  };
  const omitExpiry = omit(parsedVal, FIELDS_NAME.paymentMethod_card_expiry);

  return omitExpiry;
};

export { FIELDS, INITIAL_VALUES, validationSchema, FIELDS_NAME, parseValue };
