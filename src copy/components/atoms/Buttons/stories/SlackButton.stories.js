import React from 'react';

import SlackButtonComponent from '../SlackButton';

export const SlackButton = (args) => <SlackButtonComponent {...args} />;
SlackButton.args = {
  children: 'Submit',
  padding: '10px 10px',
  width: '150px',
};

export default {
  title: 'Atoms/Buttons',
  component: SlackButtonComponent,
};
