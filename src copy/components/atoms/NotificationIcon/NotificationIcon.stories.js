import React from 'react';
import NotificationIconComponent from './NotificationIcon';

export const NotificationIcon = (args) => <NotificationIconComponent {...args} />;

NotificationIcon.args = {
  margin: '10px 10px',
};

export default {
  title: 'Atoms/NotificationIcon',
  component: NotificationIconComponent,
};
