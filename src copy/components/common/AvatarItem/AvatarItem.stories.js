import React from 'react';
import AvatarItemComponent from './AvatarItem';

export const AvatarItem = (args) => <AvatarItemComponent {...args} />;

AvatarItem.args = {
  name: 'Name',
  text: 'some text',
};

export default {
  title: 'Common Components/AvatarItem',
  component: AvatarItemComponent,
};
