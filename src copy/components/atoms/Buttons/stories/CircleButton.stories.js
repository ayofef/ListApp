import React from 'react';

import CircleButtonComponent from '../CircleButton';

export const CircleButton = (args) => <CircleButtonComponent {...args} />;
CircleButton.args = { children: 'text' };

export default {
  title: 'Atoms/Buttons',
  component: CircleButtonComponent,
};
