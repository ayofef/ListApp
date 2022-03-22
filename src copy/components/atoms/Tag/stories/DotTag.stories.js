import React from 'react';
import DotTagComponent from '../DotTag';
import THEME from '../../../../constants/theme';

export const DotTag = (args) => (
  <DotTagComponent color={args.color} margin={args.margin}>
    WhenThen
  </DotTagComponent>
);

DotTag.args = {
  color: THEME.primaryColors.primary,
  margin: '0 0 0 4px',
};

export default {
  title: 'Atoms/Tag',
  component: DotTagComponent,
};
