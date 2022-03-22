import React from 'react';
import SwitcherComponent from '../Switcher';

export const Switcher = (args) => <SwitcherComponent {...args} />;

Switcher.args = {
  margin: '5px 5px',
};

export default {
  title: 'Atoms/Switcher',
  component: SwitcherComponent,
  argTypes: {
    maincolor: {
      control: {
        type: 'select',
        options: ['default', 'red', 'blue', 'green'],
      },
    },
  },
};
