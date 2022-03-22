import isEmpty from 'lodash/isEmpty';
import creditCardValidator from '../validators/creditCardValidator';
import editCreditCardValidator from '../validators/editCreditCardValidator';

const creditCardFieldsNames = {
  nickname: 'nickname',
  name: 'name',
  cardNumber: 'cardNumber',
  cvv: 'cvv',
  expiryDate: 'expiryDate',
};

export const creditCardFields = [
  { field: creditCardFieldsNames.nickname, label: 'Nickname' },
  { field: creditCardFieldsNames.name, label: 'Full name' },
  { field: creditCardFieldsNames.cardNumber, label: 'Card number' },
  { field: creditCardFieldsNames.cvv, label: 'CVV' },
  { field: creditCardFieldsNames.expiryDate, label: 'Expiry date' },
];

const creditCardSchema = {
  mapPropsToValues: ({ initialValues }) => {
    return {
      [creditCardFieldsNames.nickname]: (!isEmpty(initialValues) && initialValues.cardInfo.nickname) || '',
      [creditCardFieldsNames.name]: (!isEmpty(initialValues) && initialValues.cardInfo.cardholderName) || '',
      [creditCardFieldsNames.cardNumber]: '',
      [creditCardFieldsNames.cvv]: '',
      [creditCardFieldsNames.expiryDate]: '',
    };
  },
  validationSchema: ({ editCreditCard }) => {
    return editCreditCard ? editCreditCardValidator : creditCardValidator;
  },
  displayName: 'creditCardForm',
};

export default creditCardSchema;
