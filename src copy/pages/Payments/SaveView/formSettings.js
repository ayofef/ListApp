import * as Yup from 'yup';

const validationSchema = Yup.object({
  id: Yup.string(),
  name: Yup.string().required('Filter name is required.'),
  filter: Yup.object({}).required('Filter data is required.'),
});

export { validationSchema };
