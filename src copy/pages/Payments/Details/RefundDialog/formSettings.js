import * as Yup from 'yup';
// import buildValidator from '../../../../utils/validators/buildValidator';

const validationSchema = Yup.object().shape({
  fullRefund: Yup.boolean(),
  amount: Yup.number().when('fullRefund', {
    is: true,
    otherwise: (amount) =>
      amount
        .typeError('Amount must be a number')
        .moreThan(0, 'Amount must be greater than 0')
        .required('Amount is required'),
  }),
  reason: Yup.string(),
});

const normalize = (value) => {
  let n = 0;
  const splittedValue = value.split('.');

  const formattedValue = value
    .replace(
      /[^.\d]*$/g,
      '' // To allow only digits and decimals
    )
    .replace(/\./g, (match) => {
      n++;
      return n === 2 ? '' : match; // To allow only only one decimal
    });

  if (splittedValue[1]?.length > 1) {
    return Number(formattedValue).toFixed(2);
  }

  return formattedValue;
};
export { validationSchema, normalize };
