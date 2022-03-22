import * as Yup from 'yup';

const invitePeopleValidator = Yup.object().shape({
  team_members: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email('Email is not valid')
        .test('isValidCode', 'Email is required', (value) => (!value || value) && true),
    })
  ),
});

export default invitePeopleValidator;
