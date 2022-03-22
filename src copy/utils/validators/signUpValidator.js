import * as Yup from 'yup';
import buildValidator from './buildValidator';
import { isFreeMail } from '../isFreeMail';

const schema = Yup.lazy(() =>
  Yup.object().shape({
    name: Yup.string()
      .trim()
      .matches(/^[a-zA-Z\s]*$/, 'No special characters or numbers allowed')
      .required('Full name is required'),
    companyEmail: Yup.string()
      .email('Email is not valid')
      .test('freeMail', 'Please use your company email', (value) => !isFreeMail(value))
      .required('Email is required'),
    companyRole: Yup.string()
      .trim()
      .required('Company role is required'),
  })
);

export default buildValidator(schema);
