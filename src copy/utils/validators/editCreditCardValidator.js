import * as Yup from 'yup';

const editeditCreditCardValidator = Yup.object().shape({
  nickname: Yup.string().required('Nickname is required'),
  name: Yup.string().required('Full name is required'),
  cardNumber: Yup.string()
    .matches(/([0-9]{4})-([0-9]{4})-([0-9]{4})-([0-9]{4})/, 'Not a valid card number')
    .required('Card number is required'),
  cvv: Yup.string()
    .max(3, 'Not a valid cvv')
    .required('CVV is required'),
  expiryDate: Yup.string()
    .typeError('Not a valid expiration date. Example: MM/YY')
    .max(5, 'Not a valid expiration date. Example: MM/YY')
    .matches(/([0-9]{2})\/([0-9]{2})/, 'Not a valid expiration date. Example: MM/YY')
    .test('test-credit-card-expiration-date', 'Invalid Expiration Date has past', (expirationDate) => {
      const today = new Date();
      const monthToday = today.getMonth() + 1;
      const yearToday = today
        .getFullYear()
        .toString()
        .substr(-2);

      const [expMonth, expYear] = expirationDate.split('/');

      if (Number(expYear) < Number(yearToday)) {
        return false;
      }
      if (Number(expMonth) < monthToday && Number(expYear) <= Number(yearToday)) {
        return false;
      }
      return true;
    })
    .test('test-credit-card-expiration-date', 'Invalid Expiration Month', (expirationDate) => {
      const [expMonth] = expirationDate.split('/');

      if (Number(expMonth) > 12) {
        return false;
      }

      return true;
    })
    .required('Expiration date is required'),
});

export default editeditCreditCardValidator;
