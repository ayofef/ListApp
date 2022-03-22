import * as Yup from 'yup';
import buildValidator from './buildValidator';
import { passwordValidator } from './passwordValidator';
import { enterPasswordFieldNames } from '../schemas/enterPasswordSchema';

const resetPasswordValidator = Yup.object().shape({
  [enterPasswordFieldNames.password]: passwordValidator,
  [enterPasswordFieldNames.repeatPassword]: Yup.string().oneOf(
    [Yup.ref(enterPasswordFieldNames.password), null],
    'Passwords must match'
  ),
});

export default buildValidator(resetPasswordValidator);
