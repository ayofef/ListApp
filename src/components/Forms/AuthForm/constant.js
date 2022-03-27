import * as Yup from 'yup';

const FIELDS = {
  email: 'email',
};

const INITIAL_VALUES = {
  [FIELDS.email]: '',
};

const SignUpSchema = Yup.object().shape({
  [FIELDS.email]: Yup.string().required('Email is required').email('Must be a valid email'),
});

const FIELD_PROPS = { name: FIELDS.email, type: 'email', label: 'Email', placeholder: 'you@email.com' };

export { INITIAL_VALUES, FIELD_PROPS, SignUpSchema };
