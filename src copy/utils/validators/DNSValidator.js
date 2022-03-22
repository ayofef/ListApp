import * as Yup from 'yup';
import buildValidator from './buildValidator';

const whenArgs = ['type', (type, schema) => (type === 'custom' ? schema.required() : schema)];

const DNSSchema = Yup.object().shape({
  type: Yup.string()
    .oneOf(['default', 'custom'])
    .required(),
  displayName: Yup.string().when(...whenArgs),
  emailAddress: Yup.string()
    .email()
    .when(...whenArgs),
});

export default buildValidator(DNSSchema);
