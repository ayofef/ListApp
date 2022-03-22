const signInFieldsNames = {
  email: 'email',
  password: 'password',
};

const initialValues = {
  [signInFieldsNames.email]: '',
  [signInFieldsNames.password]: '',
};

const signInFields = [
  { type: 'email', field: signInFieldsNames.email, label: 'Email', placeholder: 'Your email' },
  { type: 'password', field: signInFieldsNames.password, label: 'Password', placeholder: 'Password' },
];

export { initialValues, signInFields };
