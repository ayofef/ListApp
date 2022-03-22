import React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { MaterialIconStyler as MaterialIconStylerComponent } from './MaterialIconStyler';

export const MaterialIconStyler = (args) => <MaterialIconStylerComponent {...args} />;

MaterialIconStyler.args = {
  icon: ArrowForwardIcon,
};

export default {
  title: 'Atoms/MaterialIconStyler',
  component: MaterialIconStylerComponent,
};
