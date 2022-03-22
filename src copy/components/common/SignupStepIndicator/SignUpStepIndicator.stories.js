import React from 'react';
import SignUpStepIndicatorComponent from './index';

export const SignUpStepIndicator = (args) => <SignUpStepIndicatorComponent {...args} />;
SignUpStepIndicator.args = {
  steps: [
    {
      label: 'Account',
    },
    {
      label: 'Select plan',
    },
    {
      label: 'Billing',
    },
  ],
  currentStep: 1,
};

export default {
  title: 'Common Components/SignUpStepIndicator',
  component: SignUpStepIndicatorComponent,
};
