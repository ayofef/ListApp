import * as Yup from 'yup';

const validationSchema = Yup.object({
  automationName: Yup.string().required('Automation name is required'),
  parentType: Yup.object({}).required('You have to select when the automation will run'),
});

const SELECT_VALUES = {
  preAuthorize: { stage: 'STAGE_AUTHORIZE_FLOW', substageName: 'Pre-Authorization', key: 'Authorize' },
  authorizeSuccess: { stage: 'STAGE_AUTHORIZE_FLOW', substageName: 'Successful Authorization', key: 'Authorize' },
  authorizeFailed: { stage: 'STAGE_AUTHORIZE_FLOW', substageName: 'Failed Authorization', key: 'Authorize' },
  captureSuccessful: { stage: 'STAGE_CAPTURE_FLOW', substageName: 'Successful Capture', key: 'Capture' },
  captureFailed: { stage: 'STAGE_CAPTURE_FLOW', substageName: 'Failed Capture', key: 'Capture' },
  settled: { stage: 'STAGE_SETTLEMENT_FLOW', substageName: 'Post-Settlement', key: 'Settle' },
};

const OPTIONS = [
  { value: SELECT_VALUES.preAuthorize, text: { text: 'Before Authorization' } },
  { value: SELECT_VALUES.authorizeSuccess, text: { text: 'After Successful Authorization' } },
  { value: SELECT_VALUES.authorizeFailed, text: { text: 'After Failed Authorization' } },
  { value: SELECT_VALUES.captureSuccessful, text: { text: 'After Successful Funds Capture' } },
  { value: SELECT_VALUES.captureFailed, text: { text: 'After Failed Funds Capture' } },
  { value: SELECT_VALUES.settled, text: { text: 'After Funds Settlement' } },
];

const initialValues = {
  automationName: 'Untitled',
  parentType: SELECT_VALUES.preAuthorize,
};

export { validationSchema, OPTIONS, SELECT_VALUES, initialValues };
