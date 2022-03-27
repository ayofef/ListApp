import * as Yup from 'yup';

const FIELDS = {
  name: 'name',
};

const INITIAL_VALUES = {
  [FIELDS.name]: '',
};
const completeProfileSchema = Yup.object().shape({
  [FIELDS.name]: Yup.string().required('Full name is required'),
});

const FIELD_PROPS = { name: FIELDS.name, type: 'text', label: 'Full name', placeholder: 'John Doe' };

export { INITIAL_VALUES, FIELD_PROPS, completeProfileSchema };
