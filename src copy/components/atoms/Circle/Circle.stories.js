import React from 'react';
import CircleComponent from './Circle';

export const Circle = (args) => <CircleComponent {...args} />;
Circle.args = {
  size: '20px',
  color: 'red',
};

export default {
  title: 'Atoms/Circle',
  component: CircleComponent,
};
