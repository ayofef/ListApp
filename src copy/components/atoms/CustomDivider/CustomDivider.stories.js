import React from 'react';
import CustomDividerComponent from './CustomDivider';

export const CustomDivider = (args) => <CustomDividerComponent {...args} />;

CustomDivider.args = {
  margin: '10px 20px',
};

export default {
  title: 'Atoms/CustomDivider',
  component: CustomDividerComponent,
};
