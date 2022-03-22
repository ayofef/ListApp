import React from 'react';

import ButtonComponent from '../Button';

export const Button = (args) => <ButtonComponent {...args} />;
Button.args = { children: 'Submit' };

export default {
  title: 'Atoms/Buttons',
  component: ButtonComponent,
  argTypes: {
    className: {
      control: {
        type: 'select',
        options: ['ghost', 'link', 'danger', 'secondary', 'white', 'blue', 'grey', 'grey-light'],
      },
    },
    onClick: { action: 'clicked' },
  },
};
