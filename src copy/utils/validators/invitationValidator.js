import * as Yup from 'yup';
import buildValidator from './buildValidator';
import { passwordValidator } from './passwordValidator';
import { termsConditionValidator } from './termsConditionValidator';

const invitationValidator = Yup.object().shape({
  email: Yup.string()
    .email('Email is not valid')
    .required('Email is required'),
  password: passwordValidator,
  accepted: termsConditionValidator,
});

export default buildValidator(invitationValidator);
