import isEmpty from 'lodash/isEmpty';
import billingCardValidator from '../validators/billingCardValidator';

const billingCardFieldsNames = {
  name: 'name',
  cardNumber: 'cardNumber',
  cvv: 'cvv',
  expiryDate: 'expiryDate',
};

export const billingCardFields = [
  { field: billingCardFieldsNames.name, label: 'Full name' },
  { field: billingCardFieldsNames.cardNumber, label: 'Card number' },
  { field: billingCardFieldsNames.cvv, label: 'CVV' },
  { field: billingCardFieldsNames.expiryDate, label: 'Expiry date' },
];

const billingCardSchema = {
  mapPropsToValues: ({ initialValues }) => {
    return {
      [billingCardFieldsNames.name]: (!isEmpty(initialValues) && initialValues.cardInfo.cardholderName) || '',
      [billingCardFieldsNames.cardNumber]: '',
      [billingCardFieldsNames.cvv]: '',
      [billingCardFieldsNames.expiryDate]: '',
    };
  },
  validationSchema: billingCardValidator,
  displayName: 'billingCardForm',
};

export default billingCardSchema;
