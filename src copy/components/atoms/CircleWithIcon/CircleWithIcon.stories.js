import React from 'react';
import CircleWithIconComponent from './CircleWithIcon';
import Icon from '../Icon/Icon';
import THEME from '../../../constants/theme';

export const CircleWithIcon = (args) => (
  <CircleWithIconComponent array={args.array} index={args.index}>
    <Icon size={20} color={THEME.primaryColors.primary} />
  </CircleWithIconComponent>
);

CircleWithIcon.args = {
  array: [],
  index: 0,
};

export default {
  title: 'Atoms/CircleWithIcon',
  component: CircleWithIconComponent,
};
