import React from 'react';
import CircleImageComponent from './CircleImage';
import card from '../../../assets/img/card.svg';

export const CircleImage = (args) => <CircleImageComponent src={card} {...args} />;
CircleImage.args = {
  margin: '10px 20px',
  size: '10',
};

export default {
  title: 'Atoms/Circle',
  component: CircleImageComponent,
};
