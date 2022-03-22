const SIZE = '22px';

const TRUE_STEP_ID = 'trueStepId';
const FALSE_STEP_ID = 'falseStepId';
const ELSE_STEP_ID = 'elseStepId';

const HANDLE_ID = {
  [TRUE_STEP_ID]: 'true',
  [FALSE_STEP_ID]: 'false',
  [ELSE_STEP_ID]: 'else',
};

const STEP_SETTINGS = {
  [TRUE_STEP_ID]: { title: 'Then proceed to', bgColor: '#1CCEA4' },
  [FALSE_STEP_ID]: { title: 'Else', bgColor: '#DF5B8B' },
  [ELSE_STEP_ID]: { title: 'Else', bgColor: '#DF5B8B' },
};

export { SIZE, STEP_SETTINGS, TRUE_STEP_ID, FALSE_STEP_ID, ELSE_STEP_ID, HANDLE_ID };
