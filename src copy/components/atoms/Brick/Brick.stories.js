import React from 'react';

import BrickComponent from './Brick';

export const Brick = (args) => <BrickComponent {...args} />;

export default {
  title: 'Atoms/Brick',
  component: BrickComponent,
  argTypes: {
    active: {
      control: {
        type: 'select',
        options: [true, false],
      },
    },
  },
};
