import * as Yup from 'yup';

const NONE_VALUE = 'wt-select-payment-flow-import';

const ERROR_MESSAGE = 'Select a payment flow';

const FIELDS_MAP = {
  flowId: 'flowId',
};

const initialValues = {
  [FIELDS_MAP.flowId]: NONE_VALUE,
};

const validationSchema = Yup.object().shape({
  [FIELDS_MAP.flowId]: Yup.string()
    .required(ERROR_MESSAGE)
    .test('disableNoneValues', ERROR_MESSAGE, (value) => value !== NONE_VALUE),
});

export { initialValues, validationSchema, FIELDS_MAP, NONE_VALUE };
