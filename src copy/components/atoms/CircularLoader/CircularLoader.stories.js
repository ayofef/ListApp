import React from 'react';
import CircularLoaderComponent from './CircularLoader';

export const CircularLoader = (args) => <CircularLoaderComponent {...args} />;

CircularLoader.args = {
  bgcolor: 'grey',
};

export default {
  title: 'Atoms/CircularLoader',
  component: CircularLoaderComponent,
};
