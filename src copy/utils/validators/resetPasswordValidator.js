import * as Yup from 'yup';
import buildValidator from './buildValidator';
import { passwordValidator } from './passwordValidator';

const resetPasswordValidator = Yup.object().shape({
  password: passwordValidator,
});

export default buildValidator(resetPasswordValidator);
