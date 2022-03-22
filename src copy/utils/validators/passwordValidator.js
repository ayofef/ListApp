import * as Yup from 'yup';

const MIN = 8;
const MESSAGES = {
  min: `Password must be at least ${MIN} characters`,
  uppercase: 'At least one uppercase character',
  lowercase: 'At least one lowercase character',
  digit: 'At least one number',
  special: 'At least one special character',
  row: 'Password cannot have more than 2 repeating characters',
  emailEqual: 'Password and email are equal',
  required: 'Password is required',
};

const passwordValidator = Yup.string()
  .min(MIN, MESSAGES.min)
  .matches(/[A-Z]/, MESSAGES.uppercase)
  .matches(/[a-z]/, MESSAGES.lowercase)
  .matches(/[0-9]/, MESSAGES.digit)
  .matches(/[!@#$%^&*]/, MESSAGES.special)
  .test('row', MESSAGES.row, (value) => !value.match(/(.)\1\1/))
  .required(MESSAGES.required);

export { MESSAGES, MIN, passwordValidator };
