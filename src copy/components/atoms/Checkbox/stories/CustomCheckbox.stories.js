import React from 'react';
import CustomCheckboxComponent from '../CustomCheckbox';

export const CustomCheckbox = (args) => <CustomCheckboxComponent {...args} />;

CustomCheckbox.args = {};

export default {
  title: 'Atoms/Checkbox',
  component: CustomCheckboxComponent,
};
