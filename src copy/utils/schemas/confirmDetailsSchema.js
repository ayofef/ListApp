const confirmDetailsNames = {
  companyName: 'companyName',
  currency: 'currency',
  companySize: 'companySize',
  paymentNeeds: 'paymentNeeds',
  paymentNeedsOthers: 'paymentNeedsOthers',
  paymentProcessors: 'paymentProcessors',
  paymentProcessorOthers: 'paymentProcessorOthers',
  acceptedTC: 'acceptedTC',
  acceptedNewsletter: 'acceptedNewsletter',
};

const confirmDetailsFields = [
  { field: confirmDetailsNames.companyName, type: 'text', label: 'Company Name' },
  { field: confirmDetailsNames.companySize, label: 'Company Size' },
  { field: confirmDetailsNames.paymentProcessors, label: 'Payment Processor(s)' },
  { field: confirmDetailsNames.currency, label: 'Primary Operating Currency' },
  { field: confirmDetailsNames.paymentNeeds, label: 'Payment Automation Needs' },
];

const initialValues = {
  [confirmDetailsNames.companyName]: '',
  [confirmDetailsNames.currency]: '',
  [confirmDetailsNames.companySize]: '',
  [confirmDetailsNames.paymentNeeds]: [],
  [confirmDetailsNames.paymentNeedsOthers]: '',
  [confirmDetailsNames.paymentProcessors]: [],
  [confirmDetailsNames.paymentProcessorOthers]: '',
  [confirmDetailsNames.acceptedTC]: false,
  [confirmDetailsNames.acceptedNewsletter]: false,
};

export { initialValues, confirmDetailsFields, confirmDetailsNames };
