import RadioButtons from './fields/RadioButtons';
import FieldSet from './fields/FieldSet';

const SUCCESS = 'SUCCESS';
const FAILED = 'FAILED';
const ENTRY = 'step0';

const createNextStep = ({ then, otherwise }) => (currentStepValue) => (currentStepValue?.length ? then : otherwise);
const createNextStepWithSet = ({ values, then, otherwise }) => {
  const set = new Set(values);

  return (value) => {
    if (!value || value?.length === 0) {
      return undefined;
    }
    return value?.some((v) => set.has(v)) ? then : otherwise;
  };
};

const SETTINGS = [
  {
    name: ENTRY,
    questions: 'Is your business live and accepting payments today?',
    tip: '',
    defaultValue: '',
    width: '152px',
    field: {
      component: RadioButtons,
      props: {
        options: [
          { value: 'true', title: 'Yes' },
          { value: 'false', title: 'No' },
        ],
      },
    },
    getNextStep: (value) => {
      if (!value) {
        return undefined;
      }

      return value === 'true' ? 'step1' : FAILED;
    },
  },
  {
    name: 'step1',
    questions: 'What terms best describe your business?',
    tip: '',
    defaultValue: [],
    width: '232px',
    field: {
      component: RadioButtons,
      props: {
        options: [
          { value: 'ecomm', title: 'Ecomm' },
          { value: 'saas', title: 'SaaS' },
          { value: 'marketplace', title: 'Marketplace' },
          { value: 'service based', title: 'Service based' },
        ],
      },
    },
    getNextStep: (value) => {
      if (!value) {
        return undefined;
      }

      return value === 'ecomm' || value === 'service based' ? 'step2' : FAILED;
    },
  },
  {
    name: 'step2',
    questions: 'Do you sell digital or physical goods or services?',
    tip: '',
    defaultValue: [],
    width: '232px',
    field: {
      component: FieldSet,
      props: {
        options: [
          { value: 'digital', title: 'Digital' },
          { value: 'physical', title: 'Physical' },
        ],
      },
    },
    getNextStep: createNextStep({ then: 'step3' }),
  },
  {
    name: 'step3',
    questions: 'Who do you sell to?',
    tip: '',
    defaultValue: [],
    width: '232px',
    field: {
      component: FieldSet,
      props: {
        options: [
          { value: 'consumers', title: 'Consumers' },
          { value: 'businesses', title: 'Businesses' },
        ],
      },
    },
    getNextStep: createNextStep({ then: 'step4' }),
  },
  {
    name: 'step4',
    questions: 'What markets do you sell in?',
    tip: '',
    defaultValue: [],
    width: '232px',
    field: {
      component: FieldSet,
      props: {
        options: [
          { value: 'Europe', title: 'Europe' },
          { value: 'UK', title: 'UK' },
          { value: 'North America', title: 'North America' },
          { value: 'Asia', title: 'Asia' },
          { value: 'South America', title: 'South America' },
          { value: 'Africa', title: 'Africa' },
          { value: 'Australia', title: 'Australia' },
          { value: 'Antarctica', title: 'Antarctica' },
        ],
      },
    },
    getNextStep: createNextStepWithSet({
      values: ['Europe', 'UK', 'North America'],
      then: 'step5',
      otherwise: FAILED,
    }),
  },
  {
    name: 'step5',
    questions: 'How do you make money?',
    tip: '',
    defaultValue: [],
    width: '312px',
    field: {
      component: FieldSet,
      props: {
        options: [
          { value: 'once', title: 'Once-off when good or service is sold' },
          { value: 'recurring', title: 'Recurring from the sale of a subscription to a good or service' },
          { value: 'commission', title: 'Commission from the sale or usage of a good or service' },
        ],
      },
    },
    getNextStep: createNextStepWithSet({
      values: ['once'],
      then: 'step6',
      otherwise: FAILED,
    }),
  },
  {
    name: 'step6',
    questions: 'When do you charge your customers?',
    tip: '',
    defaultValue: [],
    width: '312px',
    field: {
      component: FieldSet,
      props: {
        options: [
          { value: 'before', title: 'Before shipping, fulfillment, usage or trial period' },
          { value: 'after', title: 'After shipping, fulfillment, usage or trial period' },
        ],
      },
    },
    getNextStep: createNextStepWithSet({
      values: ['before'],
      then: SUCCESS,
      otherwise: FAILED,
    }),
  },
];

const stepProgress = 100 / SETTINGS.length;

const { _initialValues, STEPS } = SETTINGS.reduce(
  (acc, { name, defaultValue, ...rest }, i) => ({
    _initialValues: { ...acc.initialValues, [name]: defaultValue },
    STEPS: { ...acc.STEPS, [name]: { ...rest, progress: stepProgress * i } },
  }),
  { initialValues: {}, STEPS: {} }
);

const initialValues = { ..._initialValues, failed: false };

export { initialValues, STEPS, SUCCESS, ENTRY, FAILED };
