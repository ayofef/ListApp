import React from 'react';
import BorderLinearProgressComponent from './BorderLinearProgress';

export const BorderLinearProgress = (args) => <BorderLinearProgressComponent {...args} />;

export default {
  title: 'Common Components/BorderLinearProgress',
  component: BorderLinearProgressComponent,
  argTypes: {
    backgroundColor: {
      control: {
        type: 'select',
        options: ['default', 'red', 'blue', 'green'],
      },
    },
  },
};
