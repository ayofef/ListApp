import invitePeopleValidator from '../validators/invitePeopleValidator';

const invitePeopleFieldsNames = {
  name: 'name',
  email: 'email',
};

export const invitePeopleFields = [
  { field: invitePeopleFieldsNames.email, label: 'Email' },
  { field: invitePeopleFieldsNames.name, label: 'Name (optional)' },
];

const invitePeopleSchema = {
  mapPropsToValues: () => ({
    team_members: [
      {
        [invitePeopleFieldsNames.email]: '',
        [invitePeopleFieldsNames.name]: '',
      },
      {
        [invitePeopleFieldsNames.email]: '',
        [invitePeopleFieldsNames.name]: '',
      },
      {
        [invitePeopleFieldsNames.email]: '',
        [invitePeopleFieldsNames.name]: '',
      },
    ],
  }),
  validationSchema: invitePeopleValidator,
  displayName: 'invitePeopleForm',
};

export default invitePeopleSchema;
