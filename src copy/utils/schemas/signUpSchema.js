const signUpFieldsNames = {
  name: 'name',
  companyEmail: 'companyEmail',
  companyRole: 'companyRole',
};

const initialValues = {
  [signUpFieldsNames.name]: '',
  [signUpFieldsNames.companyEmail]: '',
  [signUpFieldsNames.companyRole]: '',
};

const signUpFields = [
  { type: 'text', field: signUpFieldsNames.name, label: 'Full Name' },
  { type: 'email', field: signUpFieldsNames.companyEmail, label: 'Company Email' },
  { type: 'select', field: signUpFieldsNames.companyRole, label: 'Company Role' },
];

const COMPANY_ROLE_OPTIONS = [
  {
    value: 'FOUNDER_OR_OWNER_OR_CEO',
    text: { text: 'Founder / Owner / CEO' },
  },
  {
    value: 'FINANCE',
    text: { text: 'Finance' },
  },
  {
    value: 'MARKETING',
    text: { text: 'Marketing' },
  },
  {
    value: 'REVENUE',
    text: { text: 'Revenue' },
  },
  {
    value: 'PAYMENTS_AND_FRAUD',
    text: { text: 'Payments and Fraud' },
  },
  {
    value: 'PRODUCT',
    text: { text: 'Product' },
  },
  {
    value: 'ENGINEERING',
    text: { text: 'Engineering' },
  },
];

export { initialValues, signUpFieldsNames, signUpFields, COMPANY_ROLE_OPTIONS };
