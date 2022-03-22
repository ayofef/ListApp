import React from 'react';
import CopyToClipboardComponent from './CopyToClipboard';

export const CopyToClipboard = (args) => (
  <CopyToClipboardComponent {...args}>
    <span>{args.text}</span>
  </CopyToClipboardComponent>
);
CopyToClipboard.args = { isSecure: true, text: 'Copy' };

export default {
  title: 'Atoms/CopyToClipboard',
  component: CopyToClipboardComponent,
  argTypes: {
    className: {
      control: {
        type: 'select',
        options: ['small'],
      },
    },
  },
};
