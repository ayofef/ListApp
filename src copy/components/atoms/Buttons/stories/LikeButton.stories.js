import React from 'react';
import { LikeButton as LikeButtonComponent } from '../LikeButton';

export const LikeButton = (args) => <LikeButtonComponent {...args} />;
LikeButton.args = {
  children: 'Submit',
  margin: '10px 10px',
};

export default {
  title: 'Atoms/Buttons',
  component: LikeButtonComponent,
};
