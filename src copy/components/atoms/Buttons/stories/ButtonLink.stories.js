import React from 'react';

import ButtonLinkComponent from '../ButtonLink';

export const ButtonLink = (args) => <ButtonLinkComponent {...args} />;
ButtonLink.args = { children: 'text' };

export default {
  title: 'Atoms/Buttons',
  component: ButtonLinkComponent,
};
