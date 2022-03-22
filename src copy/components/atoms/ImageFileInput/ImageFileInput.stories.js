import React from 'react';
import THEME from '../../../constants/theme';
import ImageFileInputComponent from './ImageFileInput';

export const ImageFileInput = (args) => <ImageFileInputComponent {...args} />;

ImageFileInput.args = {
  children: 'some text',
  margin: '10px 10px',
  fontSize: '14px',
};

export default {
  title: 'Atoms/ImageFileInput',
  component: ImageFileInputComponent,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: [THEME.greyColors.grey3, THEME.primaryColors.black, THEME.primaryColors.green],
      },
    },
  },
};
