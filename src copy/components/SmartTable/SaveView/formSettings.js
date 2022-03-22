import * as Yup from 'yup';

const validationSchema = Yup.object({
  id: Yup.string(),
  name: Yup.string().required('View name is required.'),
});

export { validationSchema };
