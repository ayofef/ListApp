import * as Yup from 'yup';

const validationSchema = Yup.object({
  ids: Yup.array()
    .of(Yup.string())
    .min(1)
    .required(),
});

const initialValues = { ids: [] };

export { validationSchema, initialValues };
