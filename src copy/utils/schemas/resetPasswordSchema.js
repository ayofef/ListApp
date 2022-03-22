const resetPasswordFieldNames = {
  password: 'password',
};

const initialValues = {
  [resetPasswordFieldNames.password]: '',
};

const resetPasswordFields = [{ type: 'password', field: resetPasswordFieldNames.password, label: 'New password' }];

export { resetPasswordFields, initialValues };
