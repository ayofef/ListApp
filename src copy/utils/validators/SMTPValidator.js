import * as Yup from 'yup';
import buildValidator from './buildValidator';

const SMTPSchema = Yup.object().shape({
  serverAddress: Yup.string().required(),
  username: Yup.string().required(),
  password: Yup.string().required(),
  encryptionType: Yup.string()
    .oneOf(['SSL', 'TLS', 'NONE'])
    .required(),
  portNumber: Yup.number()
    .typeError('PORT must be a `number`')
    .required(),
});

export default buildValidator(SMTPSchema);
