import * as Yup from 'yup';
import { isFreeMail } from '../isFreeMail';

const addPersonValidator = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string()
    .email('Email is not valid')
    .test('freeMail', 'Please use your company email', (value) => !isFreeMail(value))
    .required('Email is required'),
  companyRole: Yup.string().required('Role is required'),
});

export default addPersonValidator;
