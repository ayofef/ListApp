import React from 'react';
import Description from '@material-ui/icons/Description';
import THEME from '../../../../constants/theme';
import CustomIconButtonComponent from '../CustomIconButton';

export const CustomIconButton = (args) => <CustomIconButtonComponent {...args} />;
CustomIconButton.args = {
  children: <Description />,
  fill: THEME.primaryColors.blue,
};

export default {
  title: 'Atoms/Buttons',
  component: CustomIconButton,
};
