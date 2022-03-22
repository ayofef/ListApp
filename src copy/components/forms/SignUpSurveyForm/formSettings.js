import * as Yup from 'yup';
import buildValidator from '../../../utils/validators/buildValidator';

const FIELD_NAME = 'signUpReason';

const initialValues = { [FIELD_NAME]: [] };

const schema = Yup.object().shape({
  [FIELD_NAME]: Yup.array().min(1, 'Please select at least one value'),
});
const validationSchema = buildValidator(schema);

const OPTIONS = [
  { label: 'Better payments monitoring', value: 'BETTER_REAL_TIME_PAYMENTS' },
  { label: 'Better payments insights and reporting', value: 'OPTIMISE_PAYMENTS' },
  { label: 'Better payments management', value: 'AUTOMATE_MANUAL_PAYMENTS' },
  { label: 'Build fast and flexible payments logic', value: 'CREATE_PAYMENT_FLOWS' },
  { label: 'Not sure yet, but it looks cool', value: 'NOT_SURE_YET' },
  { label: 'All of the above', value: 'ALL_OPTIONS' },
];

export { initialValues, OPTIONS, FIELD_NAME, validationSchema };
