import * as Yup from 'yup';

import buildValidator from '../../../../utils/validators/buildValidator';

const createIssueFieldNames = {
  issuer: 'issuer',
  comment: 'comment',
};

const initialValues = {
  [createIssueFieldNames.issuer]: '',
  [createIssueFieldNames.comment]: '',
};

const schema = Yup.object().shape({
  [createIssueFieldNames.issuer]: Yup.string().required('Issuer is required'),
  [createIssueFieldNames.comment]: Yup.string().required('Comment is required'),
});

const validation = buildValidator(schema);

const FIELD_TYPES = {
  [createIssueFieldNames.issuer]: 'radio',
  [createIssueFieldNames.comment]: 'text',
};

const createIssueFields = [
  {
    type: FIELD_TYPES[createIssueFieldNames.issuer],
    field: createIssueFieldNames.issuer,
    label: 'Who is raising the issue?',
  },
  { type: FIELD_TYPES[createIssueFieldNames.comment], field: createIssueFieldNames.comment, label: 'Comment' },
];

const radioOptions = [
  {
    label: 'Customer',
    value: 'customer',
  },
  {
    label: 'Issuer',
    value: 'issuer',
  },
];

export { initialValues, createIssueFields, validation, FIELD_TYPES, radioOptions, createIssueFieldNames };
