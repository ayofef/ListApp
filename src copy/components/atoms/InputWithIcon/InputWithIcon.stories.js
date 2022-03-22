import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputWithIconComponent from './InputWithIcon';
import { MaterialIconStyler } from '../index';

export const InputWithIcon = (args) => <InputWithIconComponent {...args} />;

InputWithIcon.args = {
  children: <MaterialIconStyler icon={SearchIcon} />,
  placeholder: 'some text',
  margin: '10px 10px',
  innerPaddingLeft: '10px',
  color: 'red',
};

export default {
  title: 'Atoms/InputWithIcon',
  component: InputWithIconComponent,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'default'],
      },
    },
  },
};
