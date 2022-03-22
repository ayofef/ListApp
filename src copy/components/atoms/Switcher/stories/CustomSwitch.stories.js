import React from 'react';
import CustomSwitchComponent from '../CustomSwitch';

export const CustomSwitch = (args) => <CustomSwitchComponent checked={args.checked} {...args} />;

CustomSwitch.args = {
  checked: false,
};

export default {
  title: 'Atoms/Switcher',
  component: CustomSwitchComponent,
};
