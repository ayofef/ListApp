import React from 'react';
import ListWithCheckComponent from './ListWithCheck';

export const ListWithCheck = (args) => <ListWithCheckComponent {...args} />;

ListWithCheck.args = {
  options: [{ label: 'Secure cards' }, { label: 'Fast & reliable' }],
};

export default {
  title: 'Atoms/ListWithCheck',
  component: ListWithCheckComponent,
};
