import { forgotPasswordValidator } from '../validators/forgotPasswordValidator';

const forgotPasswordFieldNames = {
  email: 'email',
  label: 'Email',
};

export const forgotPasswordFields = [{ field: forgotPasswordFieldNames.email, label: 'Email' }];

const forgotPasswordSchema = {
  mapPropsToValues: () => ({
    [forgotPasswordFieldNames.email]: '',
  }),
  validationSchema: forgotPasswordValidator,
  displayName: 'ForgotPasswordForm',
};

export default forgotPasswordSchema;
