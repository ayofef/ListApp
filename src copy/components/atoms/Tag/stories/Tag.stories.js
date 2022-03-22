import React from 'react';
import TagComponent from '../Tag';

export const Tag = (args) => <TagComponent {...args} />;
Tag.args = {
  children: 'label',
};

export default {
  title: 'Atoms/Tag',
  component: TagComponent,
  argTypes: {
    backgroundColor: {
      control: {
        type: 'select',
        options: ['default', 'red', 'blue', 'green'],
      },
    },
    color: {
      control: {
        type: 'select',
        options: ['default', 'red', 'blue', 'green'],
      },
    },
  },
};
