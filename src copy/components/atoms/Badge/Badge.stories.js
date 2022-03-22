import React from 'react';
import BadgeComponent from './Badge';

export const Badge = (args) => <BadgeComponent {...args} />;
Badge.args = { children: 'text' };

export default {
  title: 'Atoms/Badge',
  component: BadgeComponent,
};
