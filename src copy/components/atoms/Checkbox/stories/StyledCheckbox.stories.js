import React from 'react';
import StyledCheckboxComponent from '../StyledCheckbox';

export const StyledCheckbox = (args) => <StyledCheckboxComponent {...args} />;

export default {
  title: 'Atoms/Checkbox',
  component: StyledCheckboxComponent,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['default', 'red', 'blue', 'green'],
      },
    },
  },
};
