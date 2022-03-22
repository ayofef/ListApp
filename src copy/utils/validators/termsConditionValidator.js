import * as Yup from 'yup';

const termsConditionValidator = Yup.boolean().oneOf([true], 'You need to accept Terms and Privacy');

export { termsConditionValidator };
