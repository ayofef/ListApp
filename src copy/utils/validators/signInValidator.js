import * as Yup from 'yup';

import buildValidator from './buildValidator';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Email is not valid')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default buildValidator(schema);
