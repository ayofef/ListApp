import * as Yup from 'yup';
import buildValidator from './buildValidator';
import { confirmDetailsNames } from '../schemas/confirmDetailsSchema';

const stringValidationSchema = (requiredMessage) => Yup.string().required(requiredMessage);
const arrayValidationSchema = (requiredMessage, minMessage) =>
  Yup.array()
    .of(Yup.string())
    .min(1, minMessage)
    .required(requiredMessage);

const confirmDetailsValidator = Yup.object().shape({
  [confirmDetailsNames.companyName]: stringValidationSchema('Company name is required'),
  [confirmDetailsNames.currency]: stringValidationSchema('Company operating currency is required'),
  [confirmDetailsNames.companySize]: stringValidationSchema('Company size is required'),
  [confirmDetailsNames.paymentNeeds]: arrayValidationSchema(
    'Payment processor is required',
    'At least one payment processor is required'
  ),
  [confirmDetailsNames.paymentProcessors]: arrayValidationSchema(
    'At least one payment need is required',
    'Payment processor is required'
  ),
  [confirmDetailsNames.paymentNeedsOthers]: Yup.string(),
  [confirmDetailsNames.paymentProcessorOthers]: Yup.string(),
  [confirmDetailsNames.acceptedTC]: Yup.bool()
    .oneOf([true], "You need to accept WhenThen's Terms and Conditions")
    .required(),
});

export default buildValidator(confirmDetailsValidator);
