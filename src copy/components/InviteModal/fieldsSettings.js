import isEmpty from 'lodash/isEmpty';
import * as Yup from 'yup';
import buildValidator from '../../utils/validators/buildValidator';
import { isFreeMail } from '../../utils/isFreeMail';

const inviteFieldNames = {
  emails: 'emails',
};

const initialValues = {
  [inviteFieldNames.emails]: ['', '', ''],
};

const isEmailSchema = Yup.string().email();
const schema = Yup.object().shape({
  [inviteFieldNames.emails]: Yup.array()
    .of(isEmailSchema)
    .required('Enter at least one email')
    .test('email-group-validation', 'There is invalid email', (emails) => {
      const firstInvalidEmail = emails
        .filter((v) => !isEmpty(v))
        .map((email) => email?.trim())
        .find((v) => !isEmailSchema.isValidSync(v));

      return !firstInvalidEmail;
    })
    .test('free-email-validation', 'Please use your company email', (emails) => {
      const firstFreeMail = emails.filter((v) => isFreeMail(v));

      return isEmpty(firstFreeMail);
    }),
});

const validation = buildValidator(schema);

export { initialValues, validation, inviteFieldNames, schema };
