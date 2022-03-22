const invitationFieldsNames = {
  email: 'email',
  password: 'password',
  accepted: 'accepted',
};

const initialValues = ({ email }) => ({
  [invitationFieldsNames.email]: email ?? '',
  [invitationFieldsNames.password]: '',
  [invitationFieldsNames.accepted]: false,
});

const invitationFields = [
  { type: 'text', field: invitationFieldsNames.email, label: 'Company Email' },
  { type: 'password', field: invitationFieldsNames.password, label: 'Password' },
];

export { initialValues, invitationFields, invitationFieldsNames };
