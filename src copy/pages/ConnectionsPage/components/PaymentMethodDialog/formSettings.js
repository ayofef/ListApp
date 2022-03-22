import * as Yup from 'yup';

const FIELDS = {
  methods: 'methods',
};

const initialValues = {
  [FIELDS.methods]: [],
};

const validationSchema = Yup.object({
  [FIELDS.methods]: Yup.array()
    .of(Yup.string())
    .min(1)
    .required(),
});

export { initialValues, FIELDS, validationSchema };
