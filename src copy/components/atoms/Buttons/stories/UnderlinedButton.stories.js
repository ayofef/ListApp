import React from 'react';

import UnderlinedButtonComponent from '../UnderlinedButton';

export const UnderlinedButton = (args) => <UnderlinedButtonComponent {...args} />;
UnderlinedButton.args = { children: 'text' };

export default {
  title: 'Atoms/Buttons',
  component: UnderlinedButtonComponent,
};
