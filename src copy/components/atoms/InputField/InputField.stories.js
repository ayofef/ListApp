import React from 'react';
import InputFieldComponent from './InputField';

export const InputField = (args) => <InputFieldComponent {...args} />;

InputField.args = {
  margin: '10px 10px',
  innerPaddingLeft: '10px',
};

export default {
  title: 'Atoms/InputField',
  component: InputFieldComponent,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'default'],
      },
    },
  },
};
