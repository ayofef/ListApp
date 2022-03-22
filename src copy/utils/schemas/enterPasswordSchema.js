const enterPasswordFieldNames = {
  password: 'password',
  repeatPassword: 'repeatPassword',
};

const initialValues = {
  [enterPasswordFieldNames.password]: '',
  [enterPasswordFieldNames.repeatPassword]: '',
};

const enterPasswordFields = [
  { type: 'password', field: enterPasswordFieldNames.password, label: 'Password' },
  { type: 'password', field: enterPasswordFieldNames.repeatPassword, label: 'Repeat Password' },
];

export { enterPasswordFields, initialValues, enterPasswordFieldNames };
