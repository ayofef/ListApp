import React from 'react';
import RadioComponent from './Radio';

export const Radio = (args) => <RadioComponent {...args} />;

Radio.args = {
  color: 'primary',
};

export default {
  title: 'Atoms/Radio',
  component: RadioComponent,
};
